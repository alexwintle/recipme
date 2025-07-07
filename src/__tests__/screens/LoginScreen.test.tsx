import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import LoginScreen from '../../screens/LoginScreen';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

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

    test('Should disable button until username & password is entered', async () => {
        render(<LoginScreen />);

        expect(await screen.findByPlaceholderText('Enter an email')).toBeEmptyElement();
        expect(await screen.findByPlaceholderText('Enter a password')).toBeEmptyElement();

        expect(await screen.findByRole('button')).toBeDisabled()
    })

    test('Should enable button when username & password is entered', async () => {
        render(<LoginScreen />);

        const user = userEvent.setup()

        await user.type(await screen.findByPlaceholderText('Enter an email'), 'anon@example.com');
        await user.type(await screen.findByPlaceholderText('Enter a password'), 'password123');

        expect(await screen.findByRole('button')).not.toBeDisabled()
    })

    test('Should not render error if user has entered a valid email and password', async () => {
        render(<LoginScreen />);

        const user = userEvent.setup()

        await user.type(await screen.findByPlaceholderText('Enter an email'), 'anon@example.com');
        await user.type(await screen.findByPlaceholderText('Enter a password'), 'password123');
        await user.press(await screen.findByText('Login'));

        expect(screen.queryByTestId('error-message')).toBeNull();
    });

    test('Should render error if credentials are not valid', async () => {
        (signInWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(
            new FirebaseError('auth/invalid-credential', 'Invalid credentials')
        );

        render(<LoginScreen />);

        const user = userEvent.setup()

        await user.type(await screen.findByPlaceholderText('Enter an email'), 'anon@example.com');
        await user.type(await screen.findByPlaceholderText('Enter a password'), 'password123');
        await user.press(await screen.findByText('Login'));

        expect(await screen.findByTestId('error-message')).toHaveTextContent('You have entered the wrong username or password. Please check them and try again.');
    });
});