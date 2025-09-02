import { computed } from 'vue';

export function useFormatting() {
  const formatCurrency = (value: number, decimals: number = 2): string => {
    if (!Number.isFinite(value)) return '—';
    return value.toLocaleString(undefined, {
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals,
    });
  };

  const formatCryptoAmount = (value: number, decimals: number = 8): string => {
    if (!Number.isFinite(value)) return '—';
    return value.toLocaleString(undefined, {
      maximumFractionDigits: decimals,
    });
  };

  const formatTimestamp = (timestamp: number): string => {
    return new Date(timestamp).toLocaleString();
  };

  const formatTime = (timestamp: number): string => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const formatExchangeRate = (fromUSD: number, toUSD: number, decimals: number = 8): string => {
    if (!fromUSD || !toUSD) return '—';
    const rate = fromUSD / toUSD;
    return formatCryptoAmount(rate, decimals);
  };

  return {
    formatCurrency,
    formatCryptoAmount,
    formatTimestamp,
    formatTime,
    formatExchangeRate,
  };
}
