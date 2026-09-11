import 'node:process';

export const config = {
  dryRun: process.env.DRY_RUN !== 'false',
  tradingEnabled: process.env.TRADING_ENABLED === 'true',
  initialUsdc: Number(process.env.INITIAL_USDC ?? '10'),
  operationalReserveUsdc: Number(process.env.OPERATIONAL_RESERVE_USDC ?? '5'),
  cloneReserveUsdc: Number(process.env.CLONE_RESERVE_USDC ?? '2'),
  sweepThresholdUsdc: Number(process.env.SWEEP_THRESHOLD_USDC ?? '5'),
  burnWindowMinutes: Number(process.env.BURN_WINDOW_MINUTES ?? '60'),
  ownerWalletAddress: process.env.OWNER_WALLET_ADDRESS ?? '',
  chainId: Number(process.env.CHAIN_ID ?? '8453'),
  rpcUrl: process.env.RPC_URL ?? '',
  privateKey: process.env.PRIVATE_KEY ?? '',
  usdcAddress: process.env.USDC_ADDRESS ?? '',
} as const;

export function assertSafeConfig(): void {
  if (!config.dryRun && !config.ownerWalletAddress) {
    throw new Error('OWNER_WALLET_ADDRESS is required before live operation.');
  }
  if (config.operationalReserveUsdc < 0 || config.cloneReserveUsdc < 0) {
    throw new Error('Reserves cannot be negative.');
  }
  if (config.sweepThresholdUsdc < 0) {
    throw new Error('Sweep threshold cannot be negative.');
  }
}
