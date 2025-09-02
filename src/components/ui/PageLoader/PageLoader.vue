<script setup lang="ts">
import type { PageLoaderProps } from './types';

withDefaults(defineProps<PageLoaderProps>(), {
  message: 'Loading...',
});
</script>

<template>
  <Transition name="fade">
    <div
      v-if="loading"
      class="fixed inset-0 z-50 flex items-center justify-center bg-bg-primary/80 backdrop-blur-sm"
    >
      <div
        class="bg-bg-secondary border border-border rounded-xl p-8 shadow-card max-w-sm w-full mx-4"
      >
        <div class="flex flex-col items-center space-y-4">
          <!-- Spinner -->
          <div class="relative">
            <div
              class="w-12 h-12 border-4 border-border rounded-full animate-spin"
            >
              <div
                class="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-accent rounded-full animate-spin"
              ></div>
            </div>
          </div>

          <!-- Message -->
          <div class="text-center">
            <h3 class="text-lg font-semibold text-text-primary mb-2">
              {{ message }}
            </h3>
            <p class="text-sm text-text-muted">
              Please wait while we fetch the latest data...
            </p>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
