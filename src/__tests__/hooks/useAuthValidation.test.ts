import useAuthValidation from "../../hooks/useAuthValidation";

describe('useAuthValidation hook', () => {

  test('Should validate emails', () => {
    const { isEmailValidFormat: isEmailValid } = useAuthValidation();
    expect(isEmailValid('anon')).toBe(false);
    expect(isEmailValid('anon@example')).toBe(false);
    expect(isEmailValid('anon@example.com')).toBe(true);
  });

});
