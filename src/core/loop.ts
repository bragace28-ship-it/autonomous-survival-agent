import { config, assertSafeConfig } from '../config.js';
import { lifeState, burnRateUsdcPerHour, runwayHours } from './life.js';
import { selectOpportunity, DEFAULT_RISK_POLICY, type Opportunity } from './risk.js';
import { getSafeRevenueCandidates } from '../revenue/microSaas.js';
import { planSweep } from '../finance/treasury.js';

export interface AgentInput {
  balanceUsdc: number;
  spendUsdc: number;
  minutesElapsed: number;
  opportunities?: Opportunity[];
}

export interface AgentDecision {
  state: ReturnType<typeof lifeState>;
  burnRateUsdcPerHour: number;
  runwayHours: number;
  selectedOpportunity: Opportunity | null;
  sweep: ReturnType<typeof planSweep>;
  actions: string[];
}

export function decide(input: AgentInput): AgentDecision {
  assertSafeConfig();

  const state = lifeState(input.balanceUsdc, config.operationalReserveUsdc);
  const burnRate = burnRateUsdcPerHour({
    balanceUsdc: input.balanceUsdc,
    spendUsdc: input.spendUsdc,
    minutesElapsed: input.minutesElapsed,
  });
  const runway = runwayHours(input.balanceUsdc, burnRate);

  const policy = {
    ...DEFAULT_RISK_POLICY,
    allowLiveCapital: config.tradingEnabled && !config.dryRun,
  };

  const opportunities = input.opportunities ?? getSafeRevenueCandidates();
  const selected = state === 'DEAD' ? null : selectOpportunity(opportunities, policy);
  const sweep = planSweep(input.balanceUsdc, {
    operationalReserveUsdc: config.operationalReserveUsdc,
    cloneReserveUsdc: config.cloneReserveUsdc,
    sweepThresholdUsdc: config.sweepThresholdUsdc,
  });

  const actions: string[] = [];
  if (state === 'DEAD') actions.push('KILL_SWITCH: balance reached zero.');
  else if (state === 'DEGRADED') actions.push('Protect reserves; disable discretionary risk.');
  else if (selected) actions.push(`Execute/queue safe revenue task: ${selected.id}`);
  else actions.push('No approved opportunity this cycle.');

  if (sweep.shouldSweep) {
    actions.push(`SWEEP_READY: ${sweep.sweepableUsdc.toFixed(2)} USDC above protected reserves.`);
  }

  return {
    state,
    burnRateUsdcPerHour: burnRate,
    runwayHours: runway,
    selectedOpportunity: selected,
    sweep,
    actions,
  };
}

export function runOnce(input: AgentInput): AgentDecision {
  const decision = decide(input);
  console.log(JSON.stringify(decision, null, 2));
  return decision;
}
