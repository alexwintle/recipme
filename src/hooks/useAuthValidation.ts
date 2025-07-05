interface AuthValidation {
    validateEmail: (email: string) => boolean;
    validatePassword: (password: string) => boolean;
}

export default function useAuthValidation(): AuthValidation {
    const validateEmail = (email: string) => {
        return /\S+@\S+\.\S+/.test(email);
    }

    const validatePassword = (password: string) => {
        return password.length <= 0;
    };

    return {
        validateEmail,
        validatePassword,
    };
}