export type RiskDecision = { allowed:boolean; reason:string };

export function approveTrade(balance:number, tradeUsd:number, reserveUsd:number, maxTradeUsd:number, dailyLossUsd:number, maxDailyLossUsd:number):RiskDecision {
  if (tradeUsd <= 0) return {allowed:false, reason:"trade must be positive"};
  if (tradeUsd > maxTradeUsd) return {allowed:false, reason:"trade exceeds max size"};
  if (balance - tradeUsd < reserveUsd) return {allowed:false, reason:"operational reserve protected"};
  if (dailyLossUsd + tradeUsd > maxDailyLossUsd) return {allowed:false, reason:"daily loss limit reached"};
  return {allowed:true, reason:"policy approved"};
}
