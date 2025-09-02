import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Toast, ToastOptions } from '@/types/toast';

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<Toast[]>([]);

  const addToast = (options: ToastOptions): string => {
    const id = Math.random().toString(36).slice(2, 10);
    const toast: Toast = {
      id,
      duration: 5000, // 5 seconds default
      persistent: false,
      ...options,
    };

    toasts.value.push(toast);

    // Auto remove toast after duration (unless persistent)
    if (!toast.persistent && toast.duration) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration);
    }

    return id;
  };

  const removeToast = (id: string): void => {
    const index = toasts.value.findIndex(toast => toast.id === id);
    if (index > -1) {
      toasts.value.splice(index, 1);
    }
  };

  const clearAllToasts = (): void => {
    toasts.value = [];
  };

  // Convenience methods
  const success = (
    title: string,
    message?: string,
    options?: Partial<ToastOptions>
  ): string => {
    return addToast({ type: 'success', title, message, ...options });
  };

  const error = (
    title: string,
    message?: string,
    options?: Partial<ToastOptions>
  ): string => {
    return addToast({ type: 'error', title, message, ...options });
  };

  const warning = (
    title: string,
    message?: string,
    options?: Partial<ToastOptions>
  ): string => {
    return addToast({ type: 'warning', title, message, ...options });
  };

  const info = (
    title: string,
    message?: string,
    options?: Partial<ToastOptions>
  ): string => {
    return addToast({ type: 'info', title, message, ...options });
  };

  return {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
    success,
    error,
    warning,
    info,
  };
});
