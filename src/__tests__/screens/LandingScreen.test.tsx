import React from "react";
import LandingScreen from "../../screens/LandingScreen";
import { render, screen, userEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../../screens/LoginScreen";
import SignUpScreen from "../../screens/SignUpScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

describe('LandingScreen', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Should render content correctly', async () => {
        render(
            <NavigationContainer>
                <LandingScreen />
            </NavigationContainer>
        );

        expect(await screen.findByText('Landing Page')).toBeOnTheScreen();
        expect(await screen.findByText('Welcome to the landing page of our application!')).toBeOnTheScreen();
        expect(await screen.findByText('Login')).toBeOnTheScreen();
        expect(await screen.findByText('Sign up')).toBeOnTheScreen();
    })

    test('Should navigate to login screen', async () => {
        render(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Landing Page" component={LandingScreen} />
                    <Stack.Screen name="Login" component={LoginScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        );

        const loginButton = await screen.findByText('Login');

        expect(loginButton).toBeOnTheScreen();

        await userEvent.press(loginButton);

        expect(await screen.findByTestId('log-in-screen')).toBeTruthy()
    })

    test('Should navigate to sign up screen', async () => {
        render(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Landing Page" component={LandingScreen} />
                    <Stack.Screen name="Sign Up" component={SignUpScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        );

        const signUpButton = await screen.findByText('Sign up');

        expect(signUpButton).toBeOnTheScreen();

        await userEvent.press(signUpButton);

        expect(await screen.findByTestId('sign-up-screen')).toBeTruthy()
    })
});