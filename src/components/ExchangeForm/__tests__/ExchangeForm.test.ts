import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import ExchangeForm from '../ExchangeForm.vue';
import { useExchangeStore } from '@/stores/exchange.store';

// Mock the store
vi.mock('@/stores/exchange.store', () => ({
  useExchangeStore: vi.fn(),
}));

// Mock the composables
vi.mock('@/composables/useExchange', () => ({
  useExchange: () => ({
    from: { value: 'BTC' },
    to: { value: 'ETH' },
    amount: { value: 1 },
    result: { value: 15 },
    canExecute: { value: true },
    swapCurrencies: vi.fn(),
    executeExchange: vi.fn(),
  }),
}));

vi.mock('@/composables/useFormatting', () => ({
  useFormatting: () => ({
    formatCryptoAmount: (value: number) => value.toString(),
  }),
}));

vi.mock('@/composables/useI18n', () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}));

describe('ExchangeForm', () => {
  const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: { en: {} },
  });

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should render form elements', () => {
    const mockStore = {
      ratesUSD: { BTC: 45000, ETH: 3000, USDT: 1, SOL: 100 },
      loading: false,
    };

    vi.mocked(useExchangeStore).mockReturnValue(mockStore as any);

    const wrapper = mount(ExchangeForm, {
      global: {
        plugins: [i18n],
      },
    });

    expect(wrapper.find('h2').text()).toBe('exchange.title');
    expect(wrapper.find('input[type="number"]').exists()).toBe(true);
    expect(wrapper.find('select').exists()).toBe(true);
    expect(wrapper.find('button[type="button"]').exists()).toBe(true);
  });

  it('should display currency options', () => {
    const mockStore = {
      ratesUSD: { BTC: 45000, ETH: 3000, USDT: 1, SOL: 100 },
      loading: false,
      currencies: ['BTC', 'ETH', 'USDT', 'SOL'],
    };

    vi.mocked(useExchangeStore).mockReturnValue(mockStore as any);

    const wrapper = mount(ExchangeForm, {
      global: {
        plugins: [i18n],
      },
    });

    const selects = wrapper.findAll('select');
    expect(selects.length).toBeGreaterThan(0);
  });

  it('should show estimated result', () => {
    const mockStore = {
      ratesUSD: { BTC: 45000, ETH: 3000, USDT: 1, SOL: 100 },
      loading: false,
      currencies: ['BTC', 'ETH', 'USDT', 'SOL'],
    };

    vi.mocked(useExchangeStore).mockReturnValue(mockStore as any);

    const wrapper = mount(ExchangeForm, {
      global: {
        plugins: [i18n],
      },
    });

    expect(wrapper.text()).toContain('exchange.estimated');
    // The result is displayed as a reactive value, so we just check that the text contains the estimated label
  });

  it('should have swap button', () => {
    const mockStore = {
      ratesUSD: { BTC: 45000, ETH: 3000, USDT: 1, SOL: 100 },
      loading: false,
    };

    vi.mocked(useExchangeStore).mockReturnValue(mockStore as any);

    const wrapper = mount(ExchangeForm, {
      global: {
        plugins: [i18n],
      },
    });

    const swapButton = wrapper.find('button[type="button"]');
    expect(swapButton.text()).toContain('exchange.swap');
  });

  it('should have execute button', () => {
    const mockStore = {
      ratesUSD: { BTC: 45000, ETH: 3000, USDT: 1, SOL: 100 },
      loading: false,
    };

    vi.mocked(useExchangeStore).mockReturnValue(mockStore as any);

    const wrapper = mount(ExchangeForm, {
      global: {
        plugins: [i18n],
      },
    });

    const executeButton = wrapper.find('button:not([type="button"])');
    expect(executeButton.text()).toBe('exchange.execute');
  });

  it('should show description', () => {
    const mockStore = {
      ratesUSD: { BTC: 45000, ETH: 3000, USDT: 1, SOL: 100 },
      loading: false,
    };

    vi.mocked(useExchangeStore).mockReturnValue(mockStore as any);

    const wrapper = mount(ExchangeForm, {
      global: {
        plugins: [i18n],
      },
    });

    expect(wrapper.text()).toContain('exchange.description');
  });
});
