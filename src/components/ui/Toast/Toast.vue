<script setup lang="ts">
import { computed } from 'vue';
import type { ToastProps, ToastEmits } from './types';

const props = defineProps<ToastProps>();
const emit = defineEmits<ToastEmits>();

const toastClasses = computed(() => {
  const baseClasses = 'flex items-start gap-3 p-4 rounded-lg border shadow-2xl max-w-sm w-full transform transition-all duration-300 ease-in-out backdrop-blur-md';
  
  const typeClasses = {
    success: 'bg-toast-success/90 border-success text-success backdrop-blur-md',
    error: 'bg-toast-error/90 border-danger text-danger backdrop-blur-md',
    warning: 'bg-toast-warning/90 border-warning text-warning backdrop-blur-md',
    info: 'bg-toast-info/90 border-accent text-accent backdrop-blur-md',
  };
  
  return [baseClasses, typeClasses[props.toast.type]].join(' ');
});

const iconClasses = computed(() => {
  const baseClasses = 'flex-shrink-0 w-5 h-5 mt-0.5';
  
  const typeClasses = {
    success: 'text-success',
    error: 'text-danger',
    warning: 'text-warning',
    info: 'text-accent',
  };
  
  return [baseClasses, typeClasses[props.toast.type]].join(' ');
});

const getIcon = () => {
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };
  return icons[props.toast.type];
};

const handleClose = () => {
  emit('close', props.toast.id);
};
</script>

<template>
  <div :class="toastClasses">
    <div :class="iconClasses">
      {{ getIcon() }}
    </div>
    
    <div class="flex-1 min-w-0">
      <h4 class="text-sm font-semibold">
        {{ toast.title }}
      </h4>
      <p v-if="toast.message" class="text-sm opacity-90 mt-1">
        {{ toast.message }}
      </p>
    </div>
    
    <button
      @click="handleClose"
      class="flex-shrink-0 text-current opacity-60 hover:opacity-100 transition-opacity"
      aria-label="Close notification"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>
