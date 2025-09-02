import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import StatusBadge from '../StatusBadge.vue';

describe('StatusBadge', () => {
  it('should render with default slot content', () => {
    const wrapper = mount(StatusBadge, {
      slots: {
        default: 'Status',
      },
    });
    
    expect(wrapper.text()).toBe('Status');
  });

  it('should render different status types', () => {
    const statuses = ['success', 'error', 'warning', 'info'] as const;
    
    statuses.forEach(status => {
      const wrapper = mount(StatusBadge, {
        props: { status },
        slots: { default: 'Status' },
      });
      
      if (status === 'success') {
        expect(wrapper.classes()).toContain('text-success');
        expect(wrapper.classes()).toContain('border-success/35');
      } else if (status === 'error') {
        expect(wrapper.classes()).toContain('text-danger');
        expect(wrapper.classes()).toContain('border-danger/35');
      } else if (status === 'warning') {
        expect(wrapper.classes()).toContain('text-warning');
        expect(wrapper.classes()).toContain('border-warning/35');
      } else if (status === 'info') {
        expect(wrapper.classes()).toContain('text-accent');
        expect(wrapper.classes()).toContain('border-accent/35');
      }
    });
  });

  it('should have correct success styling', () => {
    const wrapper = mount(StatusBadge, {
      props: { status: 'success' },
      slots: { default: 'Success' },
    });
    
    expect(wrapper.classes()).toContain('text-success');
    expect(wrapper.classes()).toContain('border-success/35');
    expect(wrapper.classes()).toContain('bg-success/10');
  });

  it('should have correct error styling', () => {
    const wrapper = mount(StatusBadge, {
      props: { status: 'error' },
      slots: { default: 'Error' },
    });
    
    expect(wrapper.classes()).toContain('text-danger');
    expect(wrapper.classes()).toContain('border-danger/35');
    expect(wrapper.classes()).toContain('bg-danger/10');
  });

  it('should have correct warning styling', () => {
    const wrapper = mount(StatusBadge, {
      props: { status: 'warning' },
      slots: { default: 'Warning' },
    });
    
    expect(wrapper.classes()).toContain('text-warning');
    expect(wrapper.classes()).toContain('border-warning/35');
    expect(wrapper.classes()).toContain('bg-warning/10');
  });

  it('should have correct info styling', () => {
    const wrapper = mount(StatusBadge, {
      props: { status: 'info' },
      slots: { default: 'Info' },
    });
    
    expect(wrapper.classes()).toContain('text-accent');
    expect(wrapper.classes()).toContain('border-accent/35');
    expect(wrapper.classes()).toContain('bg-accent/10');
  });

  it('should have base styling classes', () => {
    const wrapper = mount(StatusBadge, {
      props: { status: 'success' },
      slots: { default: 'Status' },
    });
    
    expect(wrapper.classes()).toContain('inline-flex');
    expect(wrapper.classes()).toContain('items-center');
    expect(wrapper.classes()).toContain('gap-2');
    expect(wrapper.classes()).toContain('px-3');
    expect(wrapper.classes()).toContain('py-1.5');
    expect(wrapper.classes()).toContain('rounded-full');
    expect(wrapper.classes()).toContain('border');
    expect(wrapper.classes()).toContain('text-sm');
    expect(wrapper.classes()).toContain('font-medium');
  });
});
