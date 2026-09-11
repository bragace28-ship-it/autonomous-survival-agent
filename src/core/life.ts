export type LifeState = 'ALIVE' | 'DEGRADED' | 'DEAD';

export interface LifeSnapshot {
  balanceUsdc: number;
  minutesElapsed: number;
  spendUsdc: number;
}

export function burnRateUsdcPerHour(snapshot: LifeSnapshot): number {
  if (snapshot.minutesElapsed <= 0) return 0;
  return (snapshot.spendUsdc / snapshot.minutesElapsed) * 60;
}

export function runwayHours(balanceUsdc: number, burnRate: number): number {
  if (burnRate <= 0) return Number.POSITIVE_INFINITY;
  return balanceUsdc / burnRate;
}

export function lifeState(balanceUsdc: number, operationalReserveUsdc: number): LifeState {
  if (balanceUsdc <= 0) return 'DEAD';
  if (balanceUsdc <= operationalReserveUsdc) return 'DEGRADED';
  return 'ALIVE';
}

export function sweepableBalance(balanceUsdc: number, operationalReserveUsdc: number, cloneReserveUsdc: number): number {
  return Math.max(0, balanceUsdc - operationalReserveUsdc - cloneReserveUsdc);
}
