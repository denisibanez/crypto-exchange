import { apiService } from './api';
import { buildCoinGeckoUrl } from '@/utils/mountParams.utils';
import type { CoinGeckoPriceResponse } from '@/types/api';
import type { SymbolCode } from '@/types/global';

class CoinGeckoService {
  private readonly coinIds: Record<SymbolCode, string> = {
    BTC: 'bitcoin',
    ETH: 'ethereum',
    USDT: 'tether',
    SOL: 'solana',
  };

  private readonly currencies = ['usd'];

  public async fetchPrices(
    signal?: AbortSignal
  ): Promise<CoinGeckoPriceResponse> {
    const ids = Object.values(this.coinIds).join(',');
    const vsCurrencies = this.currencies.join(',');

    const url = buildCoinGeckoUrl({
      ids,
      vs_currencies: vsCurrencies,
    });

    return await apiService.get<CoinGeckoPriceResponse>(url, {
      signal,
    });
  }

  public getCoinId(symbol: SymbolCode): string {
    return this.coinIds[symbol];
  }

  public getSupportedSymbols(): SymbolCode[] {
    return Object.keys(this.coinIds) as SymbolCode[];
  }
}

export const coinGeckoService = new CoinGeckoService();
export default coinGeckoService;
