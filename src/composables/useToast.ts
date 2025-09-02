import { useToastStore } from '@/stores/toast.store';

export function useToast() {
  const toastStore = useToastStore();

  return {
    success: toastStore.success,
    error: toastStore.error,
    warning: toastStore.warning,
    info: toastStore.info,
    add: toastStore.addToast,
    remove: toastStore.removeToast,
    clear: toastStore.clearAllToasts,
  };
}
