import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useExchangeStore } from '../exchange.store';
import { coinGeckoService } from '@/services/coingecko.service';

// Mock the service
vi.mock('@/services/coingecko.service', () => ({
  coinGeckoService: {
    fetchPrices: vi.fn(),
  },
}));

// Mock the toast store
vi.mock('../toast.store', () => ({
  useToastStore: () => ({
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  }),
}));

// Mock the i18n composable
vi.mock('@/composables/useI18n', () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}));

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('useExchangeStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const store = useExchangeStore();

    expect(store.ratesUSD).toEqual({ BTC: 0, ETH: 0, USDT: 1, SOL: 0 });
    expect(store.lastUpdated).toBeNull();
    expect(store.loading).toBe(false);
    expect(store.error).toBeNull();
    expect(store.history).toEqual([]);
  });

  it('should have correct currencies', () => {
    const store = useExchangeStore();

    expect(store.currencies).toEqual(['BTC', 'ETH', 'USDT', 'SOL']);
  });

  it('should fetch rates successfully', async () => {
    const mockData = {
      bitcoin: { usd: 45000 },
      ethereum: { usd: 3000 },
      tether: { usd: 1 },
      solana: { usd: 100 },
    };

    vi.mocked(coinGeckoService.fetchPrices).mockResolvedValue(mockData);

    const store = useExchangeStore();
    await store.fetchRates();

    expect(store.ratesUSD).toEqual({
      BTC: 45000,
      ETH: 3000,
      USDT: 1,
      SOL: 100,
    });
    expect(store.lastUpdated).toBeTypeOf('number');
    expect(store.loading).toBe(false);
    expect(store.error).toBeNull();
  });

  it('should handle fetch rates error', async () => {
    const errorMessage = 'Network error';
    vi.mocked(coinGeckoService.fetchPrices).mockRejectedValue(
      new Error(errorMessage)
    );

    const store = useExchangeStore();
    await store.fetchRates();

    expect(store.error).toBe(errorMessage);
    expect(store.loading).toBe(false);
  });

  it('should add to history correctly', () => {
    const store = useExchangeStore();
    const record = {
      from: 'BTC' as const,
      to: 'ETH' as const,
      amount: 1,
      result: 15,
      fromUSD: 45000,
      toUSD: 3000,
    };

    store.addToHistory(record);

    expect(store.history).toHaveLength(1);
    expect(store.history[0]).toMatchObject({
      ...record,
      id: expect.any(String),
      timestamp: expect.any(Number),
    });
  });

  it('should clear history', () => {
    const store = useExchangeStore();

    // Add some history first
    store.addToHistory({
      from: 'BTC',
      to: 'ETH',
      amount: 1,
      result: 15,
      fromUSD: 45000,
      toUSD: 3000,
    });

    expect(store.history).toHaveLength(1);

    store.clearHistory();

    expect(store.history).toEqual([]);
  });

  it('should limit history to max records', () => {
    const store = useExchangeStore();

    // Add more than max records
    for (let i = 0; i < 105; i++) {
      store.addToHistory({
        from: 'BTC',
        to: 'ETH',
        amount: 1,
        result: 15,
        fromUSD: 45000,
        toUSD: 3000,
      });
    }

    expect(store.history).toHaveLength(100);
  });

  it('should calculate state correctly', () => {
    const store = useExchangeStore();

    expect(store.state).toEqual({
      ratesUSD: { BTC: 0, ETH: 0, USDT: 1, SOL: 0 },
      lastUpdated: null,
      loading: false,
      error: null,
      history: [],
    });

    // Add some data
    store.ratesUSD = { BTC: 45000, ETH: 3000, USDT: 1, SOL: 100 };
    store.lastUpdated = Date.now();

    expect(store.state.ratesUSD).toEqual({
      BTC: 45000,
      ETH: 3000,
      USDT: 1,
      SOL: 100,
    });
    expect(store.state.lastUpdated).toBeTypeOf('number');
  });
});
