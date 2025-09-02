import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useExchange } from '../useExchange';
import { useExchangeStore } from '@/stores/exchange.store';

// Mock the store
vi.mock('@/stores/exchange.store', () => ({
  useExchangeStore: vi.fn(() => ({
    ratesUSD: { BTC: 45000, ETH: 3000, USDT: 1, SOL: 100 },
    addToHistory: vi.fn(),
    convert: vi.fn((from: string, to: string, amount: number) => {
      const rates = { BTC: 45000, ETH: 3000, USDT: 1, SOL: 100 };
      if (from === to) return amount;
      return (
        (rates[from as keyof typeof rates] * amount) /
        rates[to as keyof typeof rates]
      );
    }),
    loading: false,
  })),
}));

describe('useExchange', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should initialize with default values', () => {
    const { from, to, amount, result } = useExchange();

    expect(from.value).toBe('BTC');
    expect(to.value).toBe('ETH');
    expect(amount.value).toBe(1);
    expect(result.value).toBe(15); // 45000 / 3000
  });

  it('should calculate result correctly when rates change', () => {
    const { from, to, amount, result } = useExchange();

    from.value = 'BTC';
    to.value = 'SOL';
    amount.value = 2;

    expect(result.value).toBe(900); // (45000 * 2) / 100
  });

  it('should handle same currency exchange', () => {
    const { from, to, amount, result } = useExchange();

    from.value = 'BTC';
    to.value = 'BTC';
    amount.value = 1;

    expect(result.value).toBe(1);
  });

  it('should validate canExecute correctly', () => {
    const { amount, canExecute } = useExchange();

    amount.value = 0;
    expect(canExecute.value).toBe(false);

    amount.value = 1;
    expect(canExecute.value).toBe(true);

    amount.value = -1;
    expect(canExecute.value).toBe(false);
  });

  it('should swap currencies correctly', () => {
    const { from, to, swapCurrencies } = useExchange();

    from.value = 'BTC';
    to.value = 'ETH';

    swapCurrencies();

    expect(from.value).toBe('ETH');
    expect(to.value).toBe('BTC');
  });

  it('should execute exchange and add to history', () => {
    const mockAddToHistory = vi.fn();
    const mockConvert = vi.fn((from: string, to: string, amount: number) => {
      const rates = { BTC: 45000, ETH: 3000, USDT: 1, SOL: 100 };
      if (from === to) return amount;
      return (
        (rates[from as keyof typeof rates] * amount) /
        rates[to as keyof typeof rates]
      );
    });

    // Mock the store method
    vi.mocked(useExchangeStore).mockReturnValue({
      ratesUSD: { BTC: 45000, ETH: 3000, USDT: 1, SOL: 100 },
      addToHistory: mockAddToHistory,
      convert: mockConvert,
      loading: false,
    } as any);

    const { from, to, amount, executeExchange } = useExchange();

    from.value = 'BTC';
    to.value = 'ETH';
    amount.value = 1;

    executeExchange();

    expect(mockAddToHistory).toHaveBeenCalledWith({
      from: 'BTC',
      to: 'ETH',
      amount: 1,
      result: 15,
      fromUSD: 45000,
      toUSD: 3000,
    });
  });
});
