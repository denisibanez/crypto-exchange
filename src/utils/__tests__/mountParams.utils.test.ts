import { describe, it, expect } from 'vitest';
import { buildCoinGeckoUrl } from '../mountParams.utils';

describe('mountParams.utils', () => {
  describe('buildCoinGeckoUrl', () => {
      it('should build URL with basic parameters', () => {
    const params = {
      ids: 'bitcoin,ethereum',
      vs_currencies: 'usd',
    };

    const url = buildCoinGeckoUrl(params);

    expect(url).toContain('/simple/price');
    expect(url).toContain('ids=bitcoin%2Cethereum');
    expect(url).toContain('vs_currencies=usd');
  });

      it('should build URL with all parameters', () => {
    const params = {
      ids: 'bitcoin,ethereum,tether',
      vs_currencies: 'usd,eur',
      include_market_cap: 'true',
      include_24hr_vol: 'true',
      include_24hr_change: 'true',
      include_last_updated_at: 'true',
    };

    const url = buildCoinGeckoUrl(params);

    expect(url).toContain('ids=bitcoin%2Cethereum%2Ctether');
    expect(url).toContain('vs_currencies=usd%2Ceur');
    expect(url).toContain('include_market_cap=true');
    expect(url).toContain('include_24hr_vol=true');
    expect(url).toContain('include_24hr_change=true');
    expect(url).toContain('include_last_updated_at=true');
  });

      it('should handle empty parameters', () => {
    const params = {};

    const url = buildCoinGeckoUrl(params);

    expect(url).toContain('/simple/price');
  });

    it('should handle undefined values', () => {
      const params = {
        ids: 'bitcoin',
        vs_currencies: undefined,
        include_market_cap: 'true',
      };

      const url = buildCoinGeckoUrl(params);

      expect(url).toContain('ids=bitcoin');
      expect(url).toContain('include_market_cap=true');
      expect(url).not.toContain('vs_currencies');
    });

    it('should handle null values', () => {
      const params = {
        ids: 'bitcoin',
        vs_currencies: null,
        include_market_cap: 'true',
      };

      const url = buildCoinGeckoUrl(params);

      expect(url).toContain('ids=bitcoin');
      expect(url).toContain('include_market_cap=true');
      expect(url).not.toContain('vs_currencies');
    });

    it('should handle empty string values', () => {
      const params = {
        ids: 'bitcoin',
        vs_currencies: '',
        include_market_cap: 'true',
      };

      const url = buildCoinGeckoUrl(params);

      expect(url).toContain('ids=bitcoin');
      expect(url).toContain('include_market_cap=true');
      expect(url).not.toContain('vs_currencies');
    });

    it('should URL encode special characters', () => {
      const params = {
        ids: 'bitcoin,ethereum',
        vs_currencies: 'usd,eur',
      };

      const url = buildCoinGeckoUrl(params);

      expect(url).toContain('ids=bitcoin%2Cethereum');
      expect(url).toContain('vs_currencies=usd%2Ceur');
    });

    it('should handle boolean values', () => {
      const params = {
        ids: 'bitcoin',
        include_market_cap: true,
        include_24hr_vol: false,
      };

      const url = buildCoinGeckoUrl(params);

      expect(url).toContain('ids=bitcoin');
      expect(url).toContain('include_market_cap=true');
      expect(url).toContain('include_24hr_vol=false');
    });

    it('should handle number values', () => {
      const params = {
        ids: 'bitcoin',
        precision: 2,
      };

      const url = buildCoinGeckoUrl(params);

      expect(url).toContain('ids=bitcoin');
      expect(url).toContain('precision=2');
    });
  });
});
