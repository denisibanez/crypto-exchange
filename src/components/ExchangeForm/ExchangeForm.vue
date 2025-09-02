<script setup lang="ts">
import { useExchange } from '@/composables/useExchange';
import { useExchangeStore } from '@/stores/exchange.store';
import { useFormatting } from '@/composables/useFormatting';
import { useI18n } from '@/composables/useI18n';
import type { ExchangeFormProps } from './types';

defineProps<ExchangeFormProps>();

const store = useExchangeStore();
const { from, to, amount, result, canExecute, swapCurrencies, executeExchange } = useExchange();
const { formatCryptoAmount } = useFormatting();
const { t } = useI18n();
</script>

<template>
  <div class="bg-gradient-to-br from-bg-secondary to-bg-tertiary border border-border rounded-xl p-4 shadow-card">
    <div class="flex items-center justify-between gap-3 mb-4">
      <h2 class="text-lg font-semibold text-text-primary">{{ t('exchange.title') }}</h2>
      <button 
        type="button" 
        @click="swapCurrencies"
        class="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-text-primary bg-transparent border border-border rounded-lg hover:bg-bg-input/50 transition-colors"
        aria-label="Swap currencies"
      >
        ⇄ {{ t('exchange.swap') }}
      </button>
    </div>

    <div class="space-y-4">
      <!-- Currency Selection Row -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="space-y-2">
          <label for="from" class="block text-sm font-medium text-text-muted">
            {{ t('exchange.from') }}
          </label>
          <select 
            id="from" 
            v-model="from"
            class="w-full px-3 py-2 bg-bg-input border border-border rounded-lg text-text-primary focus:border-accent focus:outline-none transition-colors"
          >
            <option 
              v-for="currency in store.currencies" 
              :key="currency" 
              :value="currency"
            >
              {{ currency }}
            </option>
          </select>
        </div>

        <div class="space-y-2">
          <label for="to" class="block text-sm font-medium text-text-muted">
            {{ t('exchange.to') }}
          </label>
          <select 
            id="to" 
            v-model="to"
            class="w-full px-3 py-2 bg-bg-input border border-border rounded-lg text-text-primary focus:border-accent focus:outline-none transition-colors"
          >
            <option 
              v-for="currency in store.currencies" 
              :key="currency" 
              :value="currency"
            >
              {{ currency }}
            </option>
          </select>
        </div>
      </div>

      <!-- Amount Input -->
      <div class="space-y-2">
        <label for="amount" class="block text-sm font-medium text-text-muted">
          {{ t('exchange.amount') }}
        </label>
        <input 
          id="amount" 
          v-model.number="amount"
          type="number" 
          step="any" 
          min="0"
          inputmode="decimal"
          placeholder="0.0"
          class="w-full px-3 py-2 bg-bg-input border border-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent focus:outline-none transition-colors"
        />
      </div>

      <!-- Result Display -->
      <div class="space-y-2">
        <div class="text-sm font-medium text-text-muted">{{ t('exchange.estimated') }}</div>
        <div class="inline-flex items-center gap-2 px-3 py-2 bg-success/10 border border-success/35 rounded-full text-sm text-success">
          {{ amount || 0 }} {{ from }} ≈ {{ formatCryptoAmount(result) }} {{ to }}
        </div>
      </div>

      <!-- Execute Button -->
      <div class="pt-2">
        <button 
          @click="executeExchange"
          :disabled="!canExecute"
          class="w-full px-4 py-2 bg-bg-button-primary border border-bg-button-primary rounded-lg text-text-primary font-medium hover:bg-bg-button-primary/80 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {{ t('exchange.execute') }}
        </button>
      </div>
    </div>

    <p class="text-sm text-text-muted mt-4">
      {{ t('exchange.description') }}
    </p>
  </div>
</template>
