import React from "react";
import LandingScreen from "../../screens/LandingScreen";
import { render, screen, userEvent } from "@testing-library/react-native";
import { AuthStack } from "../../navigation/AuthStack";
import { NavigationContainer } from "@react-navigation/native";

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
        const user = userEvent.setup()

        render(
            <NavigationContainer>
                <AuthStack />
            </NavigationContainer>
        );

        const loginButton = await screen.findByText('Login');

        expect(loginButton).toBeOnTheScreen();
        
        await user.press(loginButton);

        expect(await screen.findByTestId('log-in-screen')).toBeTruthy()
    })
});