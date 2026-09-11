import type { Opportunity } from '../core/risk.js';

export const microSaaSOpportunities: Opportunity[] = [
  {
    id: 'margin-calculator',
    kind: 'micro_saas',
    expectedProfitUsdc: 2.0,
    estimatedCostUsdc: 0.05,
    riskScore: 5,
    speedScore: 90,
    confidence: 0.9,
    requiresLiveCapital: false,
  },
  {
    id: 'commercial-message-generator',
    kind: 'api_task',
    expectedProfitUsdc: 1.2,
    estimatedCostUsdc: 0.03,
    riskScore: 5,
    speedScore: 85,
    confidence: 0.9,
    requiresLiveCapital: false,
  },
];

export function getSafeRevenueCandidates(): Opportunity[] {
  return microSaaSOpportunities.slice();
}
