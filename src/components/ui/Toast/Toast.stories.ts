import type { Meta, StoryObj } from '@storybook/vue3';
import Toast from './Toast.vue';

const meta: Meta<typeof Toast> = {
  title: 'UI/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    toast: {
      control: { type: 'object' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    toast: {
      id: '1',
      type: 'success',
      title: 'Success!',
      message: 'Operation completed successfully',
      timestamp: Date.now(),
    },
  },
};

export const Error: Story = {
  args: {
    toast: {
      id: '2',
      type: 'error',
      title: 'Error!',
      message: 'Something went wrong',
      timestamp: Date.now(),
    },
  },
};

export const Warning: Story = {
  args: {
    toast: {
      id: '3',
      type: 'warning',
      title: 'Warning!',
      message: 'Please check your input',
      timestamp: Date.now(),
    },
  },
};

export const Info: Story = {
  args: {
    toast: {
      id: '4',
      type: 'info',
      title: 'Information',
      message: 'Here is some useful information',
      timestamp: Date.now(),
    },
  },
};
