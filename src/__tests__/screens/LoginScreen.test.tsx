import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import LoginScreen from '../../screens/LoginScreen';

jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(() => ({})),
    signInWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: { uid: 'mock-uid', email: 'test@example.com' } })),
}));

describe('LoginScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Text renders correctly on LoginScreen', async () => {
        render(<LoginScreen />);

        expect(await screen.findByText('Recipme')).toBeOnTheScreen();
        expect(await screen.findByPlaceholderText('Enter an email')).toBeOnTheScreen();
        expect(await screen.findByPlaceholderText('Enter a password')).toBeOnTheScreen();
        expect(await screen.findByText('Login')).toBeOnTheScreen();
    });

    test('Should render error if user has entered an invalid email', async () => {
        render(<LoginScreen />);

        const user = userEvent.setup()

        await user.type(await screen.findByPlaceholderText('Enter an email'), 'invalid-email');
        await user.press(await screen.findByText('Login'));

        expect(await screen.findByTestId('error-message')).toHaveTextContent('Please enter a valid email address');
    });

    test('Should not render error if user has entered a valid email and password', async () => {
        render(<LoginScreen />);

        const user = userEvent.setup()

        await user.type(await screen.findByPlaceholderText('Enter an email'), 'anon@example.com');
        await user.type(await screen.findByPlaceholderText('Enter a password'), 'password123');
        await user.press(await screen.findByText('Login'));

        expect(screen.queryByTestId('error-message')).toBeNull();
    });
});