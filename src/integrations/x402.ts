export interface X402PaymentRequest {
  url: string;
  amountUsdc: string;
  network: 'evm' | 'solana';
  description?: string;
}

/**
 * x402 is intentionally an adapter boundary here.
 * The business logic never receives or stores raw payment credentials.
 * Production transport should use the official x402 SDK/facilitator configuration.
 */
export interface X402Client {
  fetch(request: X402PaymentRequest): Promise<Response>;
}

export function x402Enabled(): boolean {
  return process.env.X402_ENABLED === 'true';
}
