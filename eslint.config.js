import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      ts: tseslint
    },
    languageOptions: {
      parser: 'typescript-eslint-parser',
    },
    rules: {
    },
  },
];
