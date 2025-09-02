// API specific types

export interface CoinGeckoPriceResponse {
  bitcoin?: { usd: number };
  ethereum?: { usd: number };
  tether?: { usd: number };
  solana?: { usd: number };
}

export interface ApiConfig {
  baseURL: string;
  timeout: number;
  headers?: Record<string, string>;
}

export interface RequestConfig {
  signal?: AbortSignal;
  timeout?: number;
}
