export interface MarketQuote {
  marketId: string;
  price: number;
  liquidity: number;
}

/** Read-only market adapter. Live order placement is intentionally not implemented. */
export async function getMarketBook(url: string): Promise<unknown> {
  const response = await fetch(url, { headers: { accept: 'application/json' } });
  if (!response.ok) throw new Error(`Market API failed: ${response.status}`);
  return response.json();
}
