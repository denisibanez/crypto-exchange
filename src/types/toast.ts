// Local types for Toast system

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  persistent?: boolean;
}

export interface ToastState {
  toasts: Toast[];
}

export interface ToastOptions {
  type: Toast['type'];
  title: string;
  message?: string;
  duration?: number;
  persistent?: boolean;
}
