import type { Meta, StoryObj } from '@storybook/vue3';
import StatusBadge from './StatusBadge.vue';

const meta: Meta<typeof StatusBadge> = {
  title: 'UI/StatusBadge',
  component: StatusBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: { type: 'select' },
      options: ['success', 'error', 'warning', 'info'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    status: 'success',
  },
  render: args => ({
    components: { StatusBadge },
    setup() {
      return { args };
    },
    template: '<StatusBadge v-bind="args">Success Status</StatusBadge>',
  }),
};

export const Error: Story = {
  args: {
    status: 'error',
  },
  render: args => ({
    components: { StatusBadge },
    setup() {
      return { args };
    },
    template: '<StatusBadge v-bind="args">Error Status</StatusBadge>',
  }),
};

export const Warning: Story = {
  args: {
    status: 'warning',
  },
  render: args => ({
    components: { StatusBadge },
    setup() {
      return { args };
    },
    template: '<StatusBadge v-bind="args">Warning Status</StatusBadge>',
  }),
};

export const Info: Story = {
  args: {
    status: 'info',
  },
  render: args => ({
    components: { StatusBadge },
    setup() {
      return { args };
    },
    template: '<StatusBadge v-bind="args">Info Status</StatusBadge>',
  }),
};
