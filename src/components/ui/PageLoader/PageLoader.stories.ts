import type { Meta, StoryObj } from '@storybook/vue3';
import PageLoader from './PageLoader.vue';

const meta: Meta<typeof PageLoader> = {
  title: 'UI/PageLoader',
  component: PageLoader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: { type: 'boolean' },
    },
    message: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    loading: true,
    message: 'Loading...',
  },
};

export const CustomMessage: Story = {
  args: {
    loading: true,
    message: 'Fetching cryptocurrency prices...',
  },
};

export const NotLoading: Story = {
  args: {
    loading: false,
    message: 'Loading...',
  },
};
