import { signInWithEmailAndPassword } from 'firebase/auth';

const mockSignInWithEmailAndPassword = signInWithEmailAndPassword as jest.Mock;

export const signInSuccessful = (user = { uid: 'mock-uid', email: 'test@example.com' }) => {
    mockSignInWithEmailAndPassword.mockImplementation(() =>
        Promise.resolve({ user })
    );
};