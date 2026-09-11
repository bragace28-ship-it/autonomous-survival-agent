import { sweepableBalance } from '../core/life.js';

export interface TreasuryPolicy {
  operationalReserveUsdc: number;
  cloneReserveUsdc: number;
  sweepThresholdUsdc: number;
}

export interface SweepPlan {
  balanceUsdc: number;
  protectedUsdc: number;
  sweepableUsdc: number;
  shouldSweep: boolean;
}

export function planSweep(balanceUsdc: number, policy: TreasuryPolicy): SweepPlan {
  const protectedUsdc = policy.operationalReserveUsdc + policy.cloneReserveUsdc;
  const sweepableUsdc = sweepableBalance(
    balanceUsdc,
    policy.operationalReserveUsdc,
    policy.cloneReserveUsdc,
  );

  return {
    balanceUsdc,
    protectedUsdc,
    sweepableUsdc,
    shouldSweep: sweepableUsdc >= policy.sweepThresholdUsdc,
  };
}

export function validateOwnerAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}
