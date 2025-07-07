import React, { useState } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '../config/firebase.config';
import useAuthValidation from '../hooks/useAuthValidation';
import styles from '../styles/styles';

const LoginScreen = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const { validateLogin } = useAuthValidation();

    const isDisabled = !email || !password || loading;

    const onLogin = async () => {
        setError('');

        const errorMessage = validateLogin(email, password);
        if (errorMessage) {
            setError(errorMessage);
            return;
        }

        setLoading(true);

        signInWithEmailAndPassword(auth, email, password).then(() => {
            //TODO navigate to home page
        }).catch((e: Error) => {
            if (e instanceof FirebaseError) {
                setError('You have entered the wrong username or password. Please check them and try again.');
                console.error("Firebase Auth Error Code:", e.code);
            } else if (e instanceof Error) {
                setError(e.message);
                console.error("General Error:", e);
            } else {
                setError('An unexpected error occurred.');
                console.error("Unexpected Error:", e);
            }
        }).finally(() => {
            setLoading(false);
        })
    };

    return (
        <View style={styles.container}>
            <Text style={styles.h1} accessibilityRole="header">Recipme</Text>

            <TextInput placeholder="Enter an email" value={email} onChangeText={setEmail} style={styles.input} />
            <TextInput placeholder="Enter a password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />

            <View style={styles.buttonContainer}>
                <Button title="Login" onPress={onLogin} disabled={isDisabled} />
            </View>

            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            {error ? <Text testID='error-message' style={styles.errorText}>{error}</Text> : null}
        </View>
    );
}

export default LoginScreen;