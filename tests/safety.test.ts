import assert from 'node:assert/strict';
import { approveOpportunity, type Opportunity } from '../src/core/risk.js';
import { lifeState, sweepableBalance } from '../src/core/life.js';
import { planSweep } from '../src/finance/treasury.js';

assert.equal(lifeState(0, 5), 'DEAD');
assert.equal(lifeState(4, 5), 'DEGRADED');
assert.equal(lifeState(10, 5), 'ALIVE');
assert.equal(sweepableBalance(10, 5, 2), 3);
assert.equal(sweepableBalance(7, 5, 2), 0);

const safe: Opportunity = {
  id: 'safe', kind: 'micro_saas', expectedProfitUsdc: 1, estimatedCostUsdc: 0.1,
  riskScore: 5, speedScore: 90, confidence: 0.9, requiresLiveCapital: false,
};
const risky: Opportunity = { ...safe, id: 'risky', riskScore: 80 };

assert.equal(approveOpportunity(safe), true);
assert.equal(approveOpportunity(risky), false);
assert.equal(planSweep(12, { operationalReserveUsdc: 5, cloneReserveUsdc: 2, sweepThresholdUsdc: 5 }).shouldSweep, true);
assert.equal(planSweep(10, { operationalReserveUsdc: 5, cloneReserveUsdc: 2, sweepThresholdUsdc: 5 }).shouldSweep, false);

console.log('All safety tests passed.');
