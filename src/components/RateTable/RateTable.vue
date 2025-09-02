<script setup lang="ts">
import { computed } from 'vue';
import { useExchangeStore } from '@/stores/exchange.store';
import { useFormatting } from '@/composables/useFormatting';
import { useI18n } from '@/composables/useI18n';
import type { RateRow } from './types';

const store = useExchangeStore();
const { formatCurrency, formatTime } = useFormatting();
const { t } = useI18n();

const rows = computed<RateRow[]>(() => [
  { symbol: 'BTC', usd: store.ratesUSD.BTC },
  { symbol: 'ETH', usd: store.ratesUSD.ETH },
  { symbol: 'USDT', usd: store.ratesUSD.USDT },
  { symbol: 'SOL', usd: store.ratesUSD.SOL },
]);
</script>

<template>
  <div class="bg-gradient-to-br from-bg-secondary to-bg-tertiary border border-border rounded-xl p-4 shadow-card">
    <div class="flex items-center justify-between gap-3 mb-4">
      <h2 class="text-lg font-semibold text-text-primary">{{ t('prices.title') }}</h2>
      <span 
        v-if="store.lastUpdated" 
        class="text-sm text-text-muted"
      >
        {{ t('prices.updated', { time: formatTime(store.lastUpdated) }) }}
      </span>
    </div>
    
    <div class="overflow-hidden rounded-lg border border-border">
      <table class="w-full border-collapse" aria-label="Cryptocurrency prices in USD">
        <thead class="bg-bg-input">
          <tr>
            <th class="text-left p-3 text-sm font-medium text-text-muted border-b border-border">
              {{ t('prices.currency') }}
            </th>
            <th class="text-left p-3 text-sm font-medium text-text-muted border-b border-border">
              USD
            </th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="row in rows" 
            :key="row.symbol"
            class="hover:bg-bg-input/50 transition-colors"
          >
            <td class="p-3 text-text-primary font-medium">
              {{ row.symbol }}
            </td>
            <td class="p-3 text-text-primary">
              {{ formatCurrency(row.usd) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <p 
      v-if="!store.lastUpdated" 
      class="text-sm text-text-muted mt-3"
    >
      {{ t('prices.waiting') }}
    </p>
  </div>
</template>
