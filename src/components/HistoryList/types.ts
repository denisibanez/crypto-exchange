// Local types for HistoryList component

export interface HistoryListProps {
  maxItems?: number;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  from: string;
  to: string;
  amount: number;
  result: number;
  fromUSD: number;
  toUSD: number;
}
