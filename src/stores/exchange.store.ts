import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { SymbolCode, RatesUSD, ExchangeRecord, AppState } from '@/types/global';
import { coinGeckoService } from '@/services/coingecko.service';
import { useToastStore } from './toast.store';
import { useI18n } from '@/composables/useI18n';

const STORAGE_KEY = import.meta.env.VITE_HISTORY_STORAGE_KEY || 'crypto-exchange-history-v1';
const MAX_HISTORY_RECORDS = Number(import.meta.env.VITE_MAX_HISTORY_RECORDS) || 100;

export const useExchangeStore = defineStore('exchange', () => {
  // State
  const ratesUSD = ref<RatesUSD>({ BTC: 0, ETH: 0, USDT: 1, SOL: 0 });
  const lastUpdated = ref<number | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const history = ref<ExchangeRecord[]>([]);
  
  // Toast store for notifications
  const toastStore = useToastStore();
  const { t } = useI18n();

  // Getters
  const currencies = computed<SymbolCode[]>(() => ['BTC', 'ETH', 'USDT', 'SOL']);
  
  const state = computed<AppState>(() => ({
    ratesUSD: ratesUSD.value,
    lastUpdated: lastUpdated.value,
    loading: loading.value,
    error: error.value,
    history: history.value,
  }));

  // Actions
  const loadHistory = (): void => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as ExchangeRecord[];
        if (Array.isArray(parsed)) {
          history.value = parsed;
        }
      }
    } catch (error) {
      console.error('Failed to load history from localStorage:', error);
    }
  };

  const persistHistory = (): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history.value));
    } catch (error) {
      console.error('Failed to persist history to localStorage:', error);
    }
  };

  const fetchRates = async (showToast: boolean = false): Promise<void> => {
    loading.value = true;
    error.value = null;
    
    try {
      const data = await coinGeckoService.fetchPrices();
      const next: RatesUSD = {
        BTC: data.bitcoin?.usd ?? ratesUSD.value.BTC,
        ETH: data.ethereum?.usd ?? ratesUSD.value.ETH,
        USDT: data.tether?.usd ?? ratesUSD.value.USDT,
        SOL: data.solana?.usd ?? ratesUSD.value.SOL,
      };
      
      ratesUSD.value = next;
      lastUpdated.value = Date.now();
      
      // Success toast only if explicitly requested
      if (showToast) {
        toastStore.success(
          t('toast.pricesUpdated'),
          t('toast.pricesUpdatedMessage')
        );
      }
    } catch (err: any) {
      error.value = err?.message ?? 'Failed to fetch rates';
      console.error('Error fetching rates:', err);
      
      // Error toast only if explicitly requested
      if (showToast) {
        toastStore.error(
          t('toast.pricesError'),
          err?.message ?? t('toast.pricesErrorMessage')
        );
      }
    } finally {
      loading.value = false;
    }
  };



  const convert = (from: SymbolCode, to: SymbolCode, amount: number): number => {
    if (amount <= 0) return 0;
    
    const fromUSD = ratesUSD.value[from];
    const toUSD = ratesUSD.value[to];
    
    if (!fromUSD || !toUSD) return 0;
    
    const usdValue = amount * fromUSD;
    return usdValue / toUSD;
  };

  const addToHistory = (record: Omit<ExchangeRecord, 'id' | 'timestamp'>): void => {
    const id = Math.random().toString(36).slice(2, 10);
    const newRecord: ExchangeRecord = {
      id,
      timestamp: Date.now(),
      ...record,
    };
    
    history.value.unshift(newRecord);
    
    // Keep only last N records to avoid localStorage bloat
    if (history.value.length > MAX_HISTORY_RECORDS) {
      history.value.length = MAX_HISTORY_RECORDS;
    }
    
    persistHistory();
    
    // Success toast for exchange
    toastStore.success(
      t('toast.exchangeExecuted'),
      t('toast.exchangeExecutedMessage', {
        amount: record.amount,
        from: record.from,
        result: record.result.toFixed(8),
        to: record.to
      })
    );
  };

  const clearHistory = (): void => {
    history.value = [];
    persistHistory();
    
    // Info toast for clearing history
    toastStore.info(
      t('toast.historyCleared'),
      t('toast.historyClearedMessage')
    );
  };

  // Initialize
  loadHistory();

  return {
    // State
    ratesUSD,
    lastUpdated,
    loading,
    error,
    history,
    
    // Getters
    currencies,
    state,
    
    // Actions
    fetchRates,
    convert,
    addToHistory,
    clearHistory,
  };
});
