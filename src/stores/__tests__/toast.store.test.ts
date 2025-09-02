import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useToastStore } from '../toast.store';

describe('useToastStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should initialize with empty toasts', () => {
    const store = useToastStore();
    
    expect(store.toasts).toEqual([]);
  });

  it('should add success toast', () => {
    const store = useToastStore();
    
    store.success('Success Title', 'Success message');
    
    expect(store.toasts).toHaveLength(1);
    expect(store.toasts[0]).toMatchObject({
      type: 'success',
      title: 'Success Title',
      message: 'Success message',
      id: expect.any(String),
      duration: 5000,
      persistent: false,
    });
  });

  it('should add error toast', () => {
    const store = useToastStore();
    
    store.error('Error Title', 'Error message');
    
    expect(store.toasts).toHaveLength(1);
    expect(store.toasts[0]).toMatchObject({
      type: 'error',
      title: 'Error Title',
      message: 'Error message',
    });
  });

  it('should add warning toast', () => {
    const store = useToastStore();
    
    store.warning('Warning Title', 'Warning message');
    
    expect(store.toasts).toHaveLength(1);
    expect(store.toasts[0]).toMatchObject({
      type: 'warning',
      title: 'Warning Title',
      message: 'Warning message',
    });
  });

  it('should add info toast', () => {
    const store = useToastStore();
    
    store.info('Info Title', 'Info message');
    
    expect(store.toasts).toHaveLength(1);
    expect(store.toasts[0]).toMatchObject({
      type: 'info',
      title: 'Info Title',
      message: 'Info message',
    });
  });

  it('should remove toast by id', () => {
    const store = useToastStore();
    
    store.success('Title', 'Message');
    const toastId = store.toasts[0].id;
    
    expect(store.toasts).toHaveLength(1);
    
    store.removeToast(toastId);
    
    expect(store.toasts).toHaveLength(0);
  });

  it('should handle multiple toasts', () => {
    const store = useToastStore();
    
    store.success('Success', 'Success message');
    store.error('Error', 'Error message');
    store.warning('Warning', 'Warning message');
    
    expect(store.toasts).toHaveLength(3);
    expect(store.toasts[0].type).toBe('success');
    expect(store.toasts[1].type).toBe('error');
    expect(store.toasts[2].type).toBe('warning');
  });

  it('should generate unique ids for toasts', () => {
    const store = useToastStore();
    
    store.success('Title 1', 'Message 1');
    store.success('Title 2', 'Message 2');
    
    expect(store.toasts[0].id).not.toBe(store.toasts[1].id);
  });

  it('should set correct duration', () => {
    const store = useToastStore();
    
    store.success('Title', 'Message');
    
    expect(store.toasts[0].duration).toBe(5000);
  });
});
