// Local types for RateTable component

export interface RateRow {
  symbol: string;
  usd: number;
}

export interface RateTableProps {
  rates?: Record<string, number>;
  lastUpdated?: number | null;
  loading?: boolean;
}
