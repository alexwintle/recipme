import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SignIn from '../SignIn';

test('renders SignIn and shows error on invalid email', () => {
  const { getByPlaceholderText, getByText } = render(<SignIn />);
  fireEvent.changeText(getByPlaceholderText('Email'), 'invalid');
  fireEvent.changeText(getByPlaceholderText('Password'), '123456');
  fireEvent.press(getByText('Sign In'));
  expect(getByText(/invalid email/i)).toBeTruthy();
});