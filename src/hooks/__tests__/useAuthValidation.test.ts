import { renderHook } from '@testing-library/react';
import useAuthValidation from '../../hooks/useAuthValidation';

describe('useAuthValidation', () => {
  test('validateEmailAndPassword returns appropriate error messages', () => {
    const { result } = renderHook(() => useAuthValidation());
    expect(result.current.validateEmailAndPassword('', '')).toBe('Email cannot be empty');
    expect(result.current.validateEmailAndPassword('invalid', '123')).toBe('Please enter a valid email address');
    expect(result.current.validateEmailAndPassword('test@example.com', '')).toBe('Password cannot be empty');
    expect(result.current.validateEmailAndPassword('test@example.com', '123')).toBeUndefined();
  });
});
