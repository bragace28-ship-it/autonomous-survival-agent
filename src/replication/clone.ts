import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';

export interface ChildIdentity {
  address: `0x${string}`;
  privateKey: `0x${string}`;
}

/**
 * Generates a new child identity locally. Funding/deployment is deliberately separated
 * and requires a human-approved treasury action; this module never transfers funds.
 */
export function generateChildIdentity(): ChildIdentity {
  const privateKey = generatePrivateKey();
  const account = privateKeyToAccount(privateKey);
  return { address: account.address, privateKey };
}

export function canFundChild(balanceUsdc: number, cloneReserveUsdc: number, requestedUsdc: number): boolean {
  return requestedUsdc > 0 && balanceUsdc - requestedUsdc >= cloneReserveUsdc;
}
