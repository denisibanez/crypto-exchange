<script setup lang="ts">
import { onMounted } from 'vue';
import { useExchangeStore } from '@/stores/exchange.store';
import { useI18n } from '@/composables/useI18n';
import RateTable from '@/components/RateTable/RateTable.vue';
import ExchangeForm from '@/components/ExchangeForm/ExchangeForm.vue';
import HistoryList from '@/components/HistoryList/HistoryList.vue';
import Button from '@/components/ui/Button/Button.vue';
import StatusBadge from '@/components/ui/StatusBadge/StatusBadge.vue';
import PageLoader from '@/components/ui/PageLoader/PageLoader.vue';
import ToastContainer from '@/components/ui/ToastContainer/ToastContainer.vue';
import type { HomeViewProps } from './types';

defineProps<HomeViewProps>();

const store = useExchangeStore();
const { t } = useI18n();

onMounted(async () => {
  // Initial load without toast notification
  await store.fetchRates(false);
});

const getStatusType = () => {
  if (store.loading) return 'info';
  if (store.error) return 'error';
  return 'success';
};

const getStatusText = () => {
  if (store.loading) return t('status.loading');
  if (store.error) return t('status.error', { message: store.error });
  return t('status.ready');
};
</script>

<template>
  <div class="min-h-screen bg-gradient-bg">
    <div class="max-w-7xl mx-auto px-4 py-6">
      <!-- Header -->
      <header class="flex items-center justify-between gap-4 mb-6">
        <h1 class="text-2xl font-bold text-text-primary tracking-wide">
          ₿ {{ t('app.title') }}
        </h1>
        <div class="flex items-center gap-3">
          <StatusBadge :status="getStatusType()">
            {{ getStatusText() }}
          </StatusBadge>
          <Button
            variant="ghost"
            size="sm"
            :loading="store.loading"
            @click="() => store.fetchRates(true)"
          >
            {{ t('navigation.refresh') }}
          </Button>
        </div>
      </header>

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
        <!-- Left Column -->
        <div class="space-y-6">
          <RateTable />
          <HistoryList />
        </div>

        <!-- Right Column -->
        <div>
          <ExchangeForm />
        </div>
      </div>

      <!-- Footer -->
      <p class="text-sm text-text-muted mt-8 text-center">
        {{ t('footer.description') }}
      </p>
    </div>

    <!-- Page Loader -->
    <PageLoader
      :loading="store.loading && !store.lastUpdated"
      message="Loading cryptocurrency prices..."
    />

    <!-- Toast Container -->
    <ToastContainer />
  </div>
</template>
