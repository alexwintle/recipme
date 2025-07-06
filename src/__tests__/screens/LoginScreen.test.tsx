import React from 'react';
import { render, screen } from '@testing-library/react-native';
import LoginScreen from '../../screens/LoginScreen';
import { signInSuccessful } from '../mocks/firebaseAuthMocks';

describe('LoginScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        signInSuccessful();
    });

    test('Text renders correctly on LoginScreen', () => {
        render(<LoginScreen />);

        expect(screen.getByText('Login')).toBeOnTheScreen();
    });

});