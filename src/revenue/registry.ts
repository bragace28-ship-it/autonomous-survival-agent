export type Opportunity = {id:string;type:"micro_saas"|"api"|"dex"|"prediction";expectedRevenueUsd:number;costUsd:number;risk:number;speed:number};
export function rank(opps:Opportunity[]){return [...opps].map(o=>({...o,score:(o.expectedRevenueUsd-o.costUsd)*o.speed/Math.max(1,o.risk)})).sort((a,b)=>b.score-a.score)}
