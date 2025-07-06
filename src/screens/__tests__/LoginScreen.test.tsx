import { render, screen } from '@testing-library/react-native';
import LoginScreen from '../LoginScreen';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({})),
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: { uid: 'mock-uid', email: 'test@example.com' } })),
}));

describe('LoginScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Text renders correctly on LoginScreen', () => {
        render(<LoginScreen />);

        expect(screen.getByText('Login')).toBeOnTheScreen();
    });
});