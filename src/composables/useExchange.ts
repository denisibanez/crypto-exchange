import { computed, ref, watch } from 'vue';
import { useExchangeStore } from '@/stores/exchange.store';
import type { SymbolCode } from '@/types/global';

export function useExchange() {
  const store = useExchangeStore();

  const from = ref<SymbolCode>('BTC');
  const to = ref<SymbolCode>('ETH');
  const amount = ref<number>(1);

  const result = computed(() => {
    return Number.isFinite(amount.value)
      ? store.convert(from.value, to.value, Number(amount.value))
      : 0;
  });

  const canExecute = computed(() => {
    return result.value > 0 && !store.loading;
  });

  const swapCurrencies = (): void => {
    const temp = from.value;
    from.value = to.value;
    to.value = temp;
  };

  const executeExchange = (): void => {
    if (!canExecute.value) return;

    store.addToHistory({
      from: from.value,
      to: to.value,
      amount: Number(amount.value),
      result: result.value,
      fromUSD: store.ratesUSD[from.value],
      toUSD: store.ratesUSD[to.value],
    });
  };

  // Keep amount positive numbers only
  watch(amount, val => {
    if (typeof val !== 'number') return;
    if (val < 0) amount.value = Math.abs(val);
  });

  return {
    // State
    from,
    to,
    amount,

    // Computed
    result,
    canExecute,

    // Actions
    swapCurrencies,
    executeExchange,
  };
}
