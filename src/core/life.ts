export function lifeState(balanceUsd:number, reserveUsd:number) {
  if (balanceUsd <= 0) return "DEAD";
  if (balanceUsd <= reserveUsd) return "DEGRADED";
  return "ALIVE";
}
