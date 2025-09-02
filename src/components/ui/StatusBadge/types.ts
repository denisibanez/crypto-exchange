// Local types for StatusBadge component

export interface StatusBadgeProps {
  status: 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
}

export type StatusType = StatusBadgeProps['status'];
