<script setup lang="ts">
import { useToastStore } from '@/stores/toast.store';
import Toast from '../Toast/Toast.vue';

const toastStore = useToastStore();

const handleClose = (id: string) => {
  toastStore.removeToast(id);
};
</script>

<template>
  <div class="fixed top-4 right-4 z-50 space-y-3 pointer-events-none">
    <TransitionGroup name="toast" tag="div" class="space-y-3">
      <div
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        class="pointer-events-auto"
      >
        <Toast :toast="toast" @close="handleClose" />
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>
