import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: async (config) => {
    // Ensure proper resolution and mock composables
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': '/src',
        '@/composables/useI18n': '/.storybook/mock-composables.ts',
        '@/composables/useExchange': '/.storybook/mock-composables.ts',
        '@/composables/useFormatting': '/.storybook/mock-composables.ts',
        '@/composables/useToast': '/.storybook/mock-composables.ts',
        '@/stores/exchange.store': '/.storybook/mock-composables.ts',
        '@/stores/toast.store': '/.storybook/mock-composables.ts',
      };
    }
    return config;
  },
};
export default config;
