import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import RateTable from '../RateTable.vue';
import { useExchangeStore } from '@/stores/exchange.store';

// Mock the store
vi.mock('@/stores/exchange.store', () => ({
  useExchangeStore: vi.fn(),
}));

// Mock the composables
vi.mock('@/composables/useFormatting', () => ({
  useFormatting: () => ({
    formatCurrency: (value: number) => `$${value.toLocaleString()}`,
    formatTime: (timestamp: number) => new Date(timestamp).toLocaleTimeString(),
  }),
}));

vi.mock('@/composables/useI18n', () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}));

describe('RateTable', () => {
  const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: { en: {} },
  });

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should render with rates data', () => {
    const mockStore = {
      ratesUSD: { BTC: 45000, ETH: 3000, USDT: 1, SOL: 100 },
      lastUpdated: Date.now(),
      loading: false,
      error: null,
    };

    vi.mocked(useExchangeStore).mockReturnValue(mockStore as any);

    const wrapper = mount(RateTable, {
      global: {
        plugins: [i18n],
      },
    });

    expect(wrapper.text()).toContain('45,000');
    expect(wrapper.text()).toContain('3,000');
    expect(wrapper.text()).toContain('1');
    expect(wrapper.text()).toContain('100');
  });

  it('should show loading state', () => {
    const mockStore = {
      ratesUSD: { BTC: 0, ETH: 0, USDT: 1, SOL: 0 },
      lastUpdated: null,
      loading: true,
      error: null,
    };

    vi.mocked(useExchangeStore).mockReturnValue(mockStore as any);

    const wrapper = mount(RateTable, {
      global: {
        plugins: [i18n],
      },
    });

    expect(wrapper.text()).toContain('prices.waiting');
  });

  it('should show error state', () => {
    const mockStore = {
      ratesUSD: { BTC: 0, ETH: 0, USDT: 1, SOL: 0 },
      lastUpdated: null,
      loading: false,
      error: 'Network error',
    };

    vi.mocked(useExchangeStore).mockReturnValue(mockStore as any);

    const wrapper = mount(RateTable, {
      global: {
        plugins: [i18n],
      },
    });

    expect(wrapper.text()).toContain('prices.waiting');
  });

  it('should display last updated time when available', () => {
    const timestamp = Date.now();
    const mockStore = {
      ratesUSD: { BTC: 45000, ETH: 3000, USDT: 1, SOL: 100 },
      lastUpdated: timestamp,
      loading: false,
      error: null,
    };

    vi.mocked(useExchangeStore).mockReturnValue(mockStore as any);

    const wrapper = mount(RateTable, {
      global: {
        plugins: [i18n],
      },
    });

    expect(wrapper.text()).toContain('prices.updated');
  });

  it('should render table headers correctly', () => {
    const mockStore = {
      ratesUSD: { BTC: 45000, ETH: 3000, USDT: 1, SOL: 100 },
      lastUpdated: Date.now(),
      loading: false,
      error: null,
    };

    vi.mocked(useExchangeStore).mockReturnValue(mockStore as any);

    const wrapper = mount(RateTable, {
      global: {
        plugins: [i18n],
      },
    });

    const headers = wrapper.findAll('th');
    expect(headers).toHaveLength(2);
    expect(headers[0].text()).toBe('prices.currency');
    expect(headers[1].text()).toBe('USD');
  });

  it('should render all currency rows', () => {
    const mockStore = {
      ratesUSD: { BTC: 45000, ETH: 3000, USDT: 1, SOL: 100 },
      lastUpdated: Date.now(),
      loading: false,
      error: null,
    };

    vi.mocked(useExchangeStore).mockReturnValue(mockStore as any);

    const wrapper = mount(RateTable, {
      global: {
        plugins: [i18n],
      },
    });

    const rows = wrapper.findAll('tbody tr');
    expect(rows).toHaveLength(4); // BTC, ETH, USDT, SOL
  });
});
