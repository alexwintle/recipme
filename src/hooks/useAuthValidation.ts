interface AuthValidation {
    isEmailValidFormat: (email: string) => boolean;
    isPasswordEmpty: (password: string) => boolean;
}

export default function useAuthValidation(): AuthValidation {
    const isEmailValidFormat = (email: string) => /\S+@\S+\.\S+/.test(email);
    const isPasswordEmpty = (password: string) => password.length > 0;

    return {
        isEmailValidFormat,
        isPasswordEmpty
    };
}