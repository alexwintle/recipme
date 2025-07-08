import React, { useState } from 'react';
import { View, TextInput, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '../config/firebase.config';
import styles from '../styles/styles';

const LoginScreen = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const isDisabled = !password || !email || loading;

    const onLogin = async () => {
        setLoading(true);

        signInWithEmailAndPassword(auth, email, password).then(() => {
            //TODO navigate to home page
        }).catch((e: Error) => {
            if (e instanceof FirebaseError) {
                if (e.code === 'auth/invalid-credential') {
                    setError('You have entered the wrong username or password. Please check them and try again.');
                    console.error("Firebase Error:", e.code);
                } else {
                    setError("Unknown firebase error: " + e.code)
                    console.error("Firebase Error:", e.code);
                }
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
        <View style={styles.container} testID="log-in-screen">
            <Text style={styles.h1} accessibilityRole="header">Recipme</Text>

            <TextInput
                placeholder="Enter an email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                placeholder="Enter a password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, isDisabled && styles.buttonDisabled]} onPress={onLogin} disabled={isDisabled}>
                    <Text>Login</Text>
                </TouchableOpacity>
            </View>

            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            {error ? <Text testID='error-message' style={styles.errorText}>{error}</Text> : null}
        </View>
    );
}

export default LoginScreen;