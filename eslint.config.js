import js from '@eslint/js';
import typescript from 'eslint-plugin-ts';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      ts: typescript
    },
    languageOptions: {
      parser: 'typescript-eslint-parser',
    },
    rules: {
    },
  },
];
