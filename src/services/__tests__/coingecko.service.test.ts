import { describe, it, expect, beforeEach, vi } from 'vitest';
import { coinGeckoService } from '../coingecko.service';
import { apiService } from '../api';

// Mock the API service
vi.mock('../api', () => ({
  apiService: {
    get: vi.fn(),
  },
}));

describe('CoinGeckoService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch prices successfully', async () => {
    const mockResponse = {
      bitcoin: { usd: 45000 },
      ethereum: { usd: 3000 },
      tether: { usd: 1 },
      solana: { usd: 100 },
    };

    vi.mocked(apiService.get).mockResolvedValue(mockResponse);

    const result = await coinGeckoService.fetchPrices();

    expect(result).toEqual(mockResponse);
    expect(apiService.get).toHaveBeenCalledWith(
      expect.stringContaining('ids=bitcoin%2Cethereum%2Ctether%2Csolana'),
      expect.any(Object)
    );
  });

  it('should handle API errors', async () => {
    const error = new Error('Network error');
    vi.mocked(apiService.get).mockRejectedValue(error);

    await expect(coinGeckoService.fetchPrices()).rejects.toThrow(
      'Network error'
    );
  });

  it('should use abort signal when provided', async () => {
    const mockResponse = {
      bitcoin: { usd: 45000 },
      ethereum: { usd: 3000 },
      tether: { usd: 1 },
      solana: { usd: 100 },
    };

    vi.mocked(apiService.get).mockResolvedValue(mockResponse);
    const abortController = new AbortController();

    await coinGeckoService.fetchPrices(abortController.signal);

    expect(apiService.get).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        signal: abortController.signal,
      })
    );
  });

  it('should get correct coin ID for BTC', () => {
    expect(coinGeckoService.getCoinId('BTC')).toBe('bitcoin');
  });

  it('should get correct coin ID for ETH', () => {
    expect(coinGeckoService.getCoinId('ETH')).toBe('ethereum');
  });

  it('should get supported symbols', () => {
    const symbols = coinGeckoService.getSupportedSymbols();
    expect(symbols).toContain('BTC');
    expect(symbols).toContain('ETH');
    expect(symbols).toContain('USDT');
    expect(symbols).toContain('SOL');
  });
});
