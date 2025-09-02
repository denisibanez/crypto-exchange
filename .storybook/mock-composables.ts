// Mock composables for Storybook
export const useI18n = () => ({
  t: (key: string, params?: any) => {
    // Simple mock translation function
    const translations: Record<string, string> = {
      'app.title': 'Crypto Exchange',
      'navigation.refresh': 'Refresh',
      'status.ready': 'Ready',
      'status.loading': 'Fetching rates…',
      'status.error': 'Error: {message}',
      'prices.title': 'Live Prices (USD)',
      'prices.currency': 'Currency',
      'prices.updated': 'Updated: {time}',
      'prices.waiting': 'Waiting for first update…',
      'exchange.title': 'Exchange',
      'exchange.from': 'From',
      'exchange.to': 'To',
      'exchange.amount': 'Amount',
      'exchange.estimated': 'Estimated',
      'exchange.execute': 'Execute Exchange',
      'exchange.swap': 'Swap',
      'exchange.description': 'Rates are live from CoinGecko. Executing will add this estimate to your local history.',
      'history.title': 'Exchange History',
      'history.clear': 'Clear',
      'history.empty': 'No exchanges yet.',
      'history.rate': 'Rate: 1 {from} = {rate} {to}',
      'history.usd': 'USD: {fromUSD} → {toUSD}',
      'toast.pricesUpdated': 'Prices Updated',
      'toast.pricesUpdatedMessage': 'Latest cryptocurrency prices have been fetched successfully',
      'toast.pricesError': 'Failed to Update Prices',
      'toast.pricesErrorMessage': 'Unable to fetch latest cryptocurrency prices',
      'toast.exchangeExecuted': 'Exchange Executed',
      'toast.exchangeExecutedMessage': '{amount} {from} → {result} {to}',
      'toast.historyCleared': 'History Cleared',
      'toast.historyClearedMessage': 'All exchange history has been removed',
      'notFound.title': 'Page Not Found',
      'notFound.description': 'The page you\'re looking for doesn\'t exist or has been moved.',
      'notFound.goHome': 'Go Back Home',
      'footer.description': 'Prices are fetched from CoinGecko Simple Price API. This is a demo app; no real trades are executed.',
    };
    
    let translation = translations[key] || key;
    
    // Simple parameter replacement
    if (params) {
      Object.keys(params).forEach(param => {
        translation = translation.replace(`{${param}}`, params[param]);
      });
    }
    
    return translation;
  },
  locale: { value: 'en' },
  setLocale: (newLocale: string) => {
    console.log('Setting locale to:', newLocale);
  },
  toggleLocale: () => {
    console.log('Toggling locale');
  },
});

export const useExchangeStore = () => ({
  ratesUSD: { BTC: 45000, ETH: 3000, USDT: 1, SOL: 100 },
  lastUpdated: Date.now(),
  loading: false,
  error: null,
  history: [],
  currencies: ['BTC', 'ETH', 'USDT', 'SOL'],
  fetchRates: async () => {},
  addToHistory: () => {},
  clearHistory: () => {},
});

export const useToastStore = () => ({
  toasts: [],
  success: () => {},
  error: () => {},
  warning: () => {},
  info: () => {},
  remove: () => {},
});

export const useFormatting = () => ({
  formatCurrency: (value: number) => `$${value.toLocaleString()}`,
  formatCryptoAmount: (value: number) => value.toFixed(8),
  formatTime: (timestamp: number) => new Date(timestamp).toLocaleTimeString(),
  formatTimestamp: (timestamp: number) => new Date(timestamp).toLocaleString(),
  formatExchangeRate: (fromUSD: number, toUSD: number) => (fromUSD / toUSD).toFixed(6),
});

export const useExchange = () => ({
  from: { value: 'BTC' },
  to: { value: 'ETH' },
  amount: { value: 1 },
  result: { value: 15 },
  canExecute: { value: true },
  swapCurrencies: () => {},
  executeExchange: () => {},
});
