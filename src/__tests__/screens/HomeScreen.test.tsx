import React from 'react';
import { render, screen } from '@testing-library/react-native';
import HomeScreen from '../../screens/HomeScreen';

describe('HomeScreen', () => {
    test('Text renders correctly on HomeScreen', async () => {
        render(<HomeScreen />);

        expect(await screen.findByText('Home Page')).toBeOnTheScreen();
        expect(await screen.findByText('Welcome to the home page of our application!')).toBeOnTheScreen();
    });
});