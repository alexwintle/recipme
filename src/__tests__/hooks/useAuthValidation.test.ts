import useAuthValidation from "../../hooks/useAuthValidation";

describe('useAuthValidation hook', () => {
  test('validateLogin returns appropriate error messages', () => {
    const { validateLogin } = useAuthValidation();
    expect(validateLogin('', '')).toBe('Email cannot be empty');
    expect(validateLogin('invalid', '123')).toBe('Please enter a valid email address');
    expect(validateLogin('test@example.com', '')).toBe('Password cannot be empty');
    expect(validateLogin('test@example.com', '123')).toBeUndefined();
  });
});
