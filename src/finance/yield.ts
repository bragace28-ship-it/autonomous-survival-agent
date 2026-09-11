export interface YieldCandidate {
  protocol: string;
  asset: string;
  apyPercent: number;
  estimatedGasUsdc: number;
  riskScore: number;
  liquidityScore: number;
}

export interface YieldDecision {
  approved: boolean;
  reason: string;
}

export function evaluateYield(candidate: YieldCandidate, idleUsdc: number): YieldDecision {
  if (idleUsdc <= 0) return { approved: false, reason: 'No idle balance.' };
  if (candidate.riskScore > 20) return { approved: false, reason: 'Risk score above policy.' };
  if (candidate.liquidityScore < 80) return { approved: false, reason: 'Liquidity below policy.' };

  const expectedOneYearUsd = idleUsdc * (candidate.apyPercent / 100);
  if (expectedOneYearUsd <= candidate.estimatedGasUsdc * 3) {
    return { approved: false, reason: 'Yield does not clear the cost buffer.' };
  }

  return { approved: false, reason: 'Advisory only: live DeFi execution remains disabled.' };
}
