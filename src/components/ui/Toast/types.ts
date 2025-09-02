// Local types for Toast component

export interface ToastProps {
  toast: {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message?: string;
    persistent?: boolean;
  };
}

export interface ToastEmits {
  close: [id: string];
}
