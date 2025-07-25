/** @jest-config-loader ts-node */

import type { Config } from 'jest';

process.env.NODE_ENV = 'test';

const config: Config = {
    preset: 'jest-expo',
    transformIgnorePatterns: [
        'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-native/js-polyfills)|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-google-places-autocomplete|@firebase|firebase)',
    ],
    transform: {
        '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest'
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'mjs'],
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    testMatch: [
        "<rootDir>/src/__tests__/**/*.test.ts",
        "<rootDir>/src/__tests__/**/*.test.tsx",
    ],
};

export default config;