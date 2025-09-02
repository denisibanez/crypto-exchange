import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';

// Import translations
import en from '../src/i18n/locales/en.json';
import pt from '../src/i18n/locales/pt.json';

// Create i18n instance
export const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    pt,
  },
});

// Create Pinia instance
export const pinia = createPinia();

// Global setup function
export const setupStorybook = () => {
  return {
    pinia,
    i18n,
  };
};
