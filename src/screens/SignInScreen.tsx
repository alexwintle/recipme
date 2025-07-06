import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../api/firebase.config';
import { AuthContext } from '../contexts/AuthContext';
import useAuthValidation from '../hooks/useAuthValidation';

const SignInScreen = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState<boolean>(false);

    const { validateEmailAndPassword } = useAuthValidation();

    const signIn = async () => {
        setError('');

        const errorMessage = validateEmailAndPassword(email, password);
        if (errorMessage) {
            setError(errorMessage);
            return;
        }

        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View>
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Sign In" onPress={signIn} disabled={loading}/>
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
        </View>
    );
}

export default SignInScreen;