import { render, screen } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';

describe('HomeScreen', () => {
    it('Text renders correctly on HomeScreen', () => {
        render(<HomeScreen />);

        expect(screen.getByText('Home Page')).toBeOnTheScreen();
        expect(screen.getByText('Welcome to the home page of our application!')).toBeOnTheScreen();
    });
});