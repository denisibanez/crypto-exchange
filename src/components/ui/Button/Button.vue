<script setup lang="ts">
import { computed } from 'vue';
import type { ButtonProps, ButtonEmits } from './types';

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'secondary',
  size: 'md',
  disabled: false,
  loading: false,
  type: 'button',
});

const emit = defineEmits<ButtonEmits>();

const buttonClasses = computed(() => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50';

  const variantClasses = {
    primary:
      'bg-bg-button-primary border border-bg-button-primary text-text-primary hover:bg-bg-button-primary/80',
    secondary:
      'bg-bg-button border border-border text-text-primary hover:bg-bg-input/50',
    ghost:
      'bg-transparent border border-border text-text-primary hover:bg-bg-input/50',
    danger:
      'bg-danger/10 border border-danger/35 text-danger hover:bg-danger/20',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const disabledClasses =
    props.disabled || props.loading
      ? 'opacity-60 cursor-not-allowed'
      : 'cursor-pointer';

  return [
    baseClasses,
    variantClasses[props.variant],
    sizeClasses[props.size],
    disabledClasses,
  ].join(' ');
});

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
};
</script>

<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="mr-2">
      <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24">
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
          fill="none"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </span>
    <slot />
  </button>
</template>
