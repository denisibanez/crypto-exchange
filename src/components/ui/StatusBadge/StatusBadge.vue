<script setup lang="ts">
import { computed } from 'vue';
import type { StatusBadgeProps } from './types';

const props = withDefaults(defineProps<StatusBadgeProps>(), {
  size: 'md',
});

const badgeClasses = computed(() => {
  const baseClasses =
    'inline-flex items-center gap-2 rounded-full border font-medium';

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  };

  const statusClasses = {
    success: 'text-success border-success/35 bg-success/10',
    warning: 'text-warning border-warning/35 bg-warning/10',
    error: 'text-danger border-danger/35 bg-danger/10',
    info: 'text-accent border-accent/35 bg-accent/10',
  };

  return [
    baseClasses,
    sizeClasses[props.size],
    statusClasses[props.status],
  ].join(' ');
});
</script>

<template>
  <span :class="badgeClasses">
    <slot />
  </span>
</template>
