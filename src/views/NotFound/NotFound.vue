<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useI18n } from '@/composables/useI18n';
import Button from '@/components/ui/Button/Button.vue';
import type { NotFoundViewProps } from './types';

defineProps<NotFoundViewProps>();

const router = useRouter();
const { t } = useI18n();

const goHome = () => {
  router.push('/');
};
</script>

<template>
  <div class="min-h-screen bg-gradient-bg flex items-center justify-center">
    <div class="max-w-md w-full mx-4 text-center">
      <div
        class="bg-gradient-to-br from-bg-secondary to-bg-tertiary border border-border rounded-xl p-8 shadow-card"
      >
        <!-- 404 Icon -->
        <div class="mb-6">
          <div class="text-6xl font-bold text-accent mb-2">404</div>
          <div class="w-16 h-1 bg-accent mx-auto rounded-full"></div>
        </div>

        <!-- Title -->
        <h1 class="text-2xl font-bold text-text-primary mb-4">
          {{ t('notFound.title') }}
        </h1>

        <!-- Description -->
        <p class="text-text-muted mb-6">
          {{ t('notFound.description') }}
        </p>

        <!-- Action Button -->
        <Button variant="primary" size="lg" @click="goHome">
          {{ t('notFound.goHome') }}
        </Button>
      </div>
    </div>
  </div>
</template>
