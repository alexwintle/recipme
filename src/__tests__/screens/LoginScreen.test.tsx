import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import LoginScreen from '../../screens/LoginScreen';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

describe('LoginScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const validEmail = "anon@example.com"
    const validPassword = "password123!"

    test('Should render correct page content', async () => {
        render(<LoginScreen />);

        expect(await screen.findByText('Recipme')).toBeOnTheScreen();
        expect(await screen.findByPlaceholderText('Enter an email')).toBeOnTheScreen();
        expect(await screen.findByPlaceholderText('Enter a password')).toBeOnTheScreen();
        expect(await screen.findByText('Login')).toBeOnTheScreen();
    });

    test('Should disable button while username & password is empty', async () => {
        render(<LoginScreen />);

        expect(await screen.findByPlaceholderText('Enter an email')).toBeEmptyElement();
        expect(await screen.findByPlaceholderText('Enter a password')).toBeEmptyElement();

        expect(await screen.findByText('Login')).toBeDisabled()
    })

    test('Should disable button while username is empty', async () => {
        render(<LoginScreen />);

        expect(await screen.findByPlaceholderText('Enter an email')).toBeEmptyElement();
        await userEvent.type(await screen.findByPlaceholderText('Enter a password'), validPassword);

        expect(await screen.findByText('Login')).toBeDisabled()
    })
    
    test('Should disable button while password is empty', async () => {
        render(<LoginScreen />);

        expect(await screen.findByPlaceholderText('Enter an email')).toBeEmptyElement();
        await userEvent.type(await screen.findByPlaceholderText('Enter a password'), validPassword);

        expect(await screen.findByText('Login')).toBeDisabled()
    })

    test('Should enable button when username & password is entered', async () => {
        render(<LoginScreen />);

        await userEvent.type(await screen.findByPlaceholderText('Enter an email'), validEmail);
        await userEvent.type(await screen.findByPlaceholderText('Enter a password'), validPassword);

        expect(await screen.findByText('Login')).not.toBeDisabled()
    })

    test('Should render error if credentials are not valid', async () => {
        (signInWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(
            new FirebaseError('auth/invalid-credential', 'Invalid credentials')
        );

        render(<LoginScreen />);

        await userEvent.type(await screen.findByPlaceholderText('Enter an email'), validEmail);
        await userEvent.type(await screen.findByPlaceholderText('Enter a password'), validPassword);
        await userEvent.press(await screen.findByText('Login'));

        expect(await screen.findByTestId('error-message')).toHaveTextContent('You have entered the wrong username or password. Please check them and try again.');
    });
    
    test('Should render error if credentials are not valid', async () => {
        (signInWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(
            new FirebaseError('auth/service-down', 'Service Down')
        );

        render(<LoginScreen />);

        await userEvent.type(await screen.findByPlaceholderText('Enter an email'), validEmail);
        await userEvent.type(await screen.findByPlaceholderText('Enter a password'), validPassword);
        await userEvent.press(await screen.findByText('Login'));

        expect(await screen.findByTestId('error-message')).toHaveTextContent("Unknown firebase error: auth/service-down");
    });
    
});