import { describe, it, expect } from 'vitest';
import { useFormatting } from '../useFormatting';

describe('useFormatting', () => {
  it('should format currency correctly', () => {
    const { formatCurrency } = useFormatting();

    expect(formatCurrency(1234.56)).toBe('1,234.56');
    expect(formatCurrency(0)).toBe('0.00');
    expect(formatCurrency(1000000)).toBe('1,000,000.00');
  });

  it('should format crypto amount correctly', () => {
    const { formatCryptoAmount } = useFormatting();

    expect(formatCryptoAmount(0.123456789)).toBe('0.12345679');
    expect(formatCryptoAmount(1)).toBe('1');
    expect(formatCryptoAmount(0.00000001)).toBe('0.00000001');
  });

  it('should format time correctly', () => {
    const { formatTime } = useFormatting();
    const timestamp = 1640995200000; // 2022-01-01 00:00:00 UTC

    const formatted = formatTime(timestamp);
    expect(formatted).toMatch(/\d{1,2}:\d{2}:\d{2}/);
  });

  it('should format timestamp correctly', () => {
    const { formatTimestamp } = useFormatting();
    const timestamp = 1640995200000; // 2022-01-01 00:00:00 UTC

    const formatted = formatTimestamp(timestamp);
    expect(formatted).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/);
  });

  it('should format exchange rate correctly', () => {
    const { formatExchangeRate } = useFormatting();

    expect(formatExchangeRate(45000, 3000)).toBe('15');
    expect(formatExchangeRate(1, 1)).toBe('1');
    expect(formatExchangeRate(100, 50)).toBe('2');
  });
});
