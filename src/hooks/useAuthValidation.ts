interface AuthValidation {
    validateEmailAndPassword: (email: string, password: string) => string | undefined;
}

export default function useAuthValidation(): AuthValidation {
    const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

    const validatePassword = (password: string) => password.length > 0;

    const isEmailEmpty = (email: string) => email.trim() === '';

    const isPasswordEmpty = (password: string) => password.trim() === '';

    const validateEmailAndPassword = (email: string, password: string): string | undefined => {
        if (isEmailEmpty(email)) return 'Email cannot be empty';
        if (!validateEmail(email)) return 'Please enter a valid email address';
        if (isPasswordEmpty(password)) return 'Password cannot be empty';
        if (!validatePassword(password)) return 'Please enter a valid password';
        return undefined;
    };

    return {
        validateEmailAndPassword
    };
}