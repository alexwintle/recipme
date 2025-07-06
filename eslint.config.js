import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
    js.configs.recommended,
    {
        files: [
            '**/*.js',
            '**/*.ts',
            '**/*.cjs',
            '**/*.mjs',
        ],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                module: 'readonly',
                exports: 'readonly',
                require: 'readonly',
            },
        },
        env: {
            node: true,
        },
        rules: {
        },
    },

    // --- TYPESCRIPT CONFIGURATION ---
    {
        files: ['**/*.ts', '**/*.tsx'],
        plugins: {
            '@typescript-eslint': tseslint.plugin,
        },
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: import.meta.dirname,
            },
            env: {
                browser: true,
                es2021: true,
                node: true,
            },
        },
        rules: {
            ...tseslint.configs.recommended.rules,
            '@typescript-eslint/no-unused-vars': [
                'warn',                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
        },
    },

    // --- JEST/TEST FILES CONFIGURATION ---
    {
        files: [
            '**/__tests__/**/*.ts',
            '**/__tests__/**/*.tsx',
            '**/*.test.ts',
            '**/*.test.tsx',
            '**/*.spec.ts',
            '**/*.spec.tsx',
            'jest.config.ts',
            'jest.setup.js',
        ],
        languageOptions: {
            env: {
                jest: true,
                node: true,
                es2021: true,
            },
        },
        rules: {
        },
    },
];