import js from '@eslint/js';
import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';
import * as parserVue from 'vue-eslint-parser';
import tsParser from '@typescript-eslint/parser';

export default [
  { ignores: ['dist', 'node_modules', '.storybook'] },
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
        global: 'readonly',
        __dirname: 'readonly',
        require: 'readonly',
      },
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
        global: 'readonly',
        __dirname: 'readonly',
        require: 'readonly',
      },
      parser: tsParser,
      parserOptions: {
        sourceType: 'module',
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-undef': 'off', // TypeScript handles this
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
        global: 'readonly',
        __dirname: 'readonly',
        require: 'readonly',
      },
      parser: parserVue,
      parserOptions: {
        sourceType: 'module',
        parser: '@typescript-eslint/parser',
      },
    },
    plugins: {
      vue: pluginVue,
    },
    rules: {
      ...pluginVue.configs['vue3-recommended'].rules,
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',
      'no-undef': 'off', // TypeScript handles this
    },
  },
];
