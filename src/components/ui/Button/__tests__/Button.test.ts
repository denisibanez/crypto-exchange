import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from '../Button.vue';

describe('Button', () => {
  it('should render with default props', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me',
      },
    });
    
    expect(wrapper.text()).toBe('Click me');
    expect(wrapper.classes()).toContain('bg-bg-button');
  });

  it('should render different variants', () => {
    const variants = ['primary', 'secondary', 'ghost', 'danger'] as const;
    
    variants.forEach(variant => {
      const wrapper = mount(Button, {
        props: { variant },
        slots: { default: 'Button' },
      });
      
      if (variant === 'primary') {
        expect(wrapper.classes()).toContain('bg-bg-button-primary');
      } else if (variant === 'secondary') {
        expect(wrapper.classes()).toContain('bg-bg-button');
      } else if (variant === 'ghost') {
        expect(wrapper.classes()).toContain('bg-transparent');
      } else if (variant === 'danger') {
        expect(wrapper.classes()).toContain('bg-danger/10');
      }
    });
  });

  it('should render different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    
    sizes.forEach(size => {
      const wrapper = mount(Button, {
        props: { size },
        slots: { default: 'Button' },
      });
      
      const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      };
      
      expect(wrapper.classes()).toContain(sizeClasses[size].split(' ')[0]);
    });
  });

  it('should show loading state', () => {
    const wrapper = mount(Button, {
      props: { loading: true },
      slots: { default: 'Button' },
    });
    
    expect(wrapper.classes()).toContain('opacity-60');
    expect(wrapper.classes()).toContain('cursor-not-allowed');
  });

  it('should be disabled when disabled prop is true', () => {
    const wrapper = mount(Button, {
      props: { disabled: true },
      slots: { default: 'Button' },
    });
    
    expect(wrapper.attributes('disabled')).toBeDefined();
    expect(wrapper.classes()).toContain('opacity-60');
    expect(wrapper.classes()).toContain('cursor-not-allowed');
  });

  it('should emit click event when clicked', async () => {
    const wrapper = mount(Button, {
      slots: { default: 'Button' },
    });
    
    await wrapper.trigger('click');
    
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('should not emit click when disabled', async () => {
    const wrapper = mount(Button, {
      props: { disabled: true },
      slots: { default: 'Button' },
    });
    
    await wrapper.trigger('click');
    
    expect(wrapper.emitted('click')).toBeFalsy();
  });

  it('should not emit click when loading', async () => {
    const wrapper = mount(Button, {
      props: { loading: true },
      slots: { default: 'Button' },
    });
    
    await wrapper.trigger('click');
    
    expect(wrapper.emitted('click')).toBeFalsy();
  });
});
