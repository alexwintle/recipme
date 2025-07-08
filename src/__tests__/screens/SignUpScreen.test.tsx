import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import SignUpScreen from '../../screens/SignUpScreen';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/HomeScreen';

const Stack = createNativeStackNavigator();

describe('SignUpScreen', () => {

    beforeEach(() => {
        jest.resetAllMocks()
    });

    const validEmail = "anon@example.com";
    const validPassword = "password123!";

    test('Text renders correctly on SignUpScreen', async () => {
        render(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Sign Up" component={SignUpScreen} />
                    <Stack.Screen name="Home" component={HomeScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        );

        expect(await screen.findByText('Recipme')).toBeOnTheScreen();
        expect(await screen.findByPlaceholderText('Enter an email')).toBeOnTheScreen();
        expect(await screen.findByPlaceholderText('Enter a password')).toBeOnTheScreen();
        expect(await screen.findByText('Sign Up')).toBeOnTheScreen();
    });

    test('Should disable the Sign Up button when email or password is empty', async () => {
        render(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Sign Up" component={SignUpScreen} />
                    <Stack.Screen name="Home" component={HomeScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        );
        await userEvent.type(await screen.findByPlaceholderText('Enter an email'), validEmail);

        expect(await screen.findByText('Sign Up')).toBeDisabled();

        await userEvent.clear(await screen.findByPlaceholderText('Enter an email'));
        await userEvent.type(await screen.findByPlaceholderText('Enter a password'), validPassword);

        expect(await screen.findByText('Sign Up')).toBeDisabled();
    });

    test('Should successfully sign up a user with valid credentisals and navigate to home page', async () => {
        (createUserWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({ user: { uid: '123' } });

        render(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Sign Up" component={SignUpScreen} />
                    <Stack.Screen name="Home" component={HomeScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        );

        await userEvent.type(await screen.findByPlaceholderText('Enter an email'), validEmail);
        await userEvent.type(await screen.findByPlaceholderText('Enter a password'), validPassword);

        expect(await screen.findByText('Sign Up')).not.toBeDisabled();

        await userEvent.press(await screen.findByText('Sign Up'));

        await expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
            expect.any(Object),
            validEmail,
            validPassword
        );

        expect(screen.queryByTestId('error-message')).toBeNull();
        expect(await screen.findByTestId('home-screen')).toBeOnTheScreen()
    });

    test('Should display error for firebase error code "email-already-in-use"', async () => {
        (createUserWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(
            new FirebaseError('auth/email-already-in-use', 'The email address is already in use.')
        );

        render(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Sign Up" component={SignUpScreen} />
                    <Stack.Screen name="Home" component={HomeScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        );

        await userEvent.type(await screen.findByPlaceholderText('Enter an email'), validEmail);
        await userEvent.type(await screen.findByPlaceholderText('Enter a password'), validPassword);

        expect(await screen.findByText('Sign Up')).not.toBeDisabled();

        await userEvent.press(await screen.findByText('Sign Up'));

        expect(await screen.findByTestId('error-message')).toHaveTextContent('This email address is already in use. Please use a different email or log in.')
    });

    test('Should display error for "weak-password"', async () => {
        (createUserWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(
            new FirebaseError('auth/weak-password', 'Password Should be at least 6 characters.')
        );

        render(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Sign Up" component={SignUpScreen} />
                    <Stack.Screen name="Home" component={HomeScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        );

        await userEvent.type(await screen.findByPlaceholderText('Enter an email'), validEmail);
        await userEvent.type(await screen.findByPlaceholderText('Enter a password'), "123");

        expect(await screen.findByText('Sign Up')).not.toBeDisabled();

        await userEvent.press(await screen.findByText('Sign Up'));

        expect(await screen.findByTestId('error-message')).toHaveTextContent('The password is too weak. Please choose a stronger password.')
    });

    test('Should display error for "invalid-email"', async () => {
        (createUserWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(
            new FirebaseError('auth/invalid-email', 'The email address is badly formatted.')
        );

        render(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Sign Up" component={SignUpScreen} />
                    <Stack.Screen name="Home" component={HomeScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        );

        await userEvent.type(await screen.findByPlaceholderText('Enter an email'), "anon@example");
        await userEvent.type(await screen.findByPlaceholderText('Enter a password'), validPassword);

        expect(await screen.findByText('Sign Up')).not.toBeDisabled();

        await userEvent.press(await screen.findByText('Sign Up'));

        expect(await screen.findByTestId('error-message')).toHaveTextContent('The email address is not valid. Please check the format.');
    });

    test('Should display a generic error for unknown Firebase errors', async () => {
        (createUserWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(
            new FirebaseError('auth/some-other-error', 'Some other Firebase error occurred.')
        );

        render(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Sign Up" component={SignUpScreen} />
                    <Stack.Screen name="Home" component={HomeScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        );

        await userEvent.type(await screen.findByPlaceholderText('Enter an email'), validEmail);
        await userEvent.type(await screen.findByPlaceholderText('Enter a password'), validPassword);

        expect(await screen.findByText('Sign Up')).not.toBeDisabled();

        await userEvent.press(await screen.findByText('Sign Up'));

        expect(await screen.findByTestId('error-message')).toHaveTextContent('An unknown Firebase error occurred: auth/some-other-error');
    });

    test('Should display a generic error for non-Firebase errors', async () => {
        (createUserWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(
            new Error('Network error occurred.')
        );

        render(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Sign Up" component={SignUpScreen} />
                    <Stack.Screen name="Home" component={HomeScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        );

        await userEvent.type(await screen.findByPlaceholderText('Enter an email'), validEmail);
        await userEvent.type(await screen.findByPlaceholderText('Enter a password'), validPassword);

        expect(await screen.findByText('Sign Up')).not.toBeDisabled();

        await userEvent.press(await screen.findByText('Sign Up'));

        expect(await screen.findByTestId('error-message')).toHaveTextContent('Network error occurred.');
    });
});
