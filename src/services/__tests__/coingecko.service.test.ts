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

  it('should have correct coin IDs', () => {
    expect(coinGeckoService.coinIds).toEqual({
      BTC: 'bitcoin',
      ETH: 'ethereum',
      USDT: 'tether',
      SOL: 'solana',
    });
  });

  it('should have correct currencies', () => {
    expect(coinGeckoService.currencies).toEqual(['usd']);
  });
});
