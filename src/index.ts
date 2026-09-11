import { config } from './config.js';
import { runOnce } from './core/loop.js';

const balanceUsdc = Number(process.env.SIM_BALANCE_USDC ?? String(config.initialUsdc));
const spendUsdc = Number(process.env.SIM_SPEND_USDC ?? '0.05');
const minutesElapsed = Number(process.env.SIM_MINUTES_ELAPSED ?? '60');

console.log('Autonomous Survival Agent — safe simulation');
console.log(`DRY_RUN=${config.dryRun}`);
console.log(`TRADING_ENABLED=${config.tradingEnabled}`);
console.log(`BALANCE=${balanceUsdc} USDC`);

runOnce({
  balanceUsdc,
  spendUsdc,
  minutesElapsed,
});

console.log('No real-money transaction is executed by this simulation.');
