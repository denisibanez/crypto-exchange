<script setup lang="ts">
import { computed } from 'vue';
import { useExchangeStore } from '@/stores/exchange.store';
import { useFormatting } from '@/composables/useFormatting';
import { useI18n } from '@/composables/useI18n';
import type { HistoryListProps } from './types';

const props = withDefaults(defineProps<HistoryListProps>(), {
  maxItems: 50,
});

const store = useExchangeStore();
const { formatCryptoAmount, formatTimestamp, formatExchangeRate, formatCurrency } = useFormatting();
const { t } = useI18n();

const displayHistory = computed(() => {
  return store.history.slice(0, props.maxItems);
});
</script>

<template>
  <div class="bg-gradient-to-br from-bg-secondary to-bg-tertiary border border-border rounded-xl p-4 shadow-card">
    <div class="flex items-center justify-between gap-3 mb-4">
      <h2 class="text-lg font-semibold text-text-primary">{{ t('history.title') }}</h2>
      <button 
        @click="store.clearHistory"
        :disabled="store.history.length === 0"
        class="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-text-primary bg-transparent border border-border rounded-lg hover:bg-bg-input/50 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {{ t('history.clear') }}
      </button>
    </div>

    <div v-if="displayHistory.length" class="space-y-3">
      <div 
        v-for="record in displayHistory" 
        :key="record.id"
        class="p-3 bg-bg-input/30 border border-border rounded-lg hover:bg-bg-input/50 transition-colors"
      >
        <div class="flex justify-between items-start gap-3 mb-2">
          <div class="flex-1">
            <span class="font-semibold text-text-primary">
              {{ formatCryptoAmount(record.amount) }} {{ record.from }}
            </span>
            <span class="text-text-muted mx-2">→</span>
            <span class="font-semibold text-text-primary">
              {{ formatCryptoAmount(record.result) }} {{ record.to }}
            </span>
          </div>
          <div class="text-sm text-text-muted whitespace-nowrap">
            {{ formatTimestamp(record.timestamp) }}
          </div>
        </div>
        
        <div class="text-sm text-text-muted">
          <div class="mb-1">
            {{ t('history.rate', { 
              from: record.from, 
              rate: formatExchangeRate(record.fromUSD, record.toUSD), 
              to: record.to 
            }) }}
          </div>
          <div>
            {{ t('history.usd', { 
              fromUSD: formatCurrency(record.fromUSD), 
              toUSD: formatCurrency(record.toUSD) 
            }) }}
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="text-center py-8">
      <p class="text-text-muted">{{ t('history.empty') }}</p>
    </div>
  </div>
</template>
