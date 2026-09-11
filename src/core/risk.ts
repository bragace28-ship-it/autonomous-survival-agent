export type ActionKind = 'micro_saas' | 'api_task' | 'dex_arbitrage' | 'prediction_market' | 'yield' | 'clone';

export interface Opportunity {
  id: string;
  kind: ActionKind;
  expectedProfitUsdc: number;
  estimatedCostUsdc: number;
  riskScore: number; // 0 low risk, 100 extreme
  speedScore: number; // 0 slow, 100 immediate
  confidence: number; // 0..1
  requiresLiveCapital: boolean;
}

export interface RiskPolicy {
  maxRiskScore: number;
  minConfidence: number;
  minExpectedEdgeUsdc: number;
  allowLiveCapital: boolean;
}

export const DEFAULT_RISK_POLICY: RiskPolicy = {
  maxRiskScore: 25,
  minConfidence: 0.70,
  minExpectedEdgeUsdc: 0.25,
  allowLiveCapital: false,
};

export function expectedEdge(o: Opportunity): number {
  return o.expectedProfitUsdc - o.estimatedCostUsdc;
}

export function approveOpportunity(o: Opportunity, p = DEFAULT_RISK_POLICY): boolean {
  if (o.requiresLiveCapital && !p.allowLiveCapital) return false;
  if (o.riskScore > p.maxRiskScore) return false;
  if (o.confidence < p.minConfidence) return false;
  if (expectedEdge(o) < p.minExpectedEdgeUsdc) return false;
  return true;
}

export function rankOpportunity(o: Opportunity): number {
  const edge = Math.max(0, expectedEdge(o));
  return edge * 0.5 + o.speedScore * 0.3 + o.confidence * 100 * 0.2 - o.riskScore * 0.4;
}

export function selectOpportunity(opportunities: Opportunity[], p = DEFAULT_RISK_POLICY): Opportunity | null {
  return opportunities
    .filter(o => approveOpportunity(o, p))
    .sort((a, b) => rankOpportunity(b) - rankOpportunity(a))[0] ?? null;
}
