import '@testing-library/jest-dom';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';

// Import translations
import en from '@/i18n/locales/en.json';
import pt from '@/i18n/locales/pt.json';

// Create i18n instance
const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    pt,
  },
});

// Create Pinia instance
const pinia = createPinia();

// Global test setup
global.pinia = pinia;
global.i18n = i18n;
