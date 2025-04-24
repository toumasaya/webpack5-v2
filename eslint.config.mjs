import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  eslintPluginPrettier,
  {
    rules: {
      'prefer-template': 'off',
      'no-var': 1,
      'no-unused-vars': 1,
      camelcase: 1,
      'no-nested-ternary': 1,
      'no-console': 1,
      'no-template-curly-in-string': 1,
      'no-self-compare': 1,
      'import/prefer-default-export': 0,
      'arrow-body-style': 1,
      'import/no-extraneous-dependencies': ['off', { devDependencies: false }],
    },
  },
]);
