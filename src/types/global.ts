// Global types for the entire application

export type SymbolCode = 'BTC' | 'ETH' | 'USDT' | 'SOL';

export type RatesUSD = Record<SymbolCode, number>;

export interface ExchangeRecord {
  id: string;
  timestamp: number;
  from: SymbolCode;
  to: SymbolCode;
  amount: number;
  result: number;
  fromUSD: number;
  toUSD: number;
}

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export interface LoadingState {
  loading: boolean;
  error: string | null;
}

export interface AppState {
  ratesUSD: RatesUSD;
  lastUpdated: number | null;
  loading: boolean;
  error: string | null;
  history: ExchangeRecord[];
}
