export function sweepable(balanceUsd:number, reserveUsd:number, cloneReserveUsd:number, minSweepUsd:number) {
  const amount = Math.max(0, balanceUsd - reserveUsd - cloneReserveUsd);
  return amount >= minSweepUsd ? amount : 0;
}
