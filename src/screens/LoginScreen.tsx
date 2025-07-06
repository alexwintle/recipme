import React, { useState } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../api/firebase.config';
import useAuthValidation from '../hooks/useAuthValidation';

const LoginScreen = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState<boolean>(false);

    const { validateLogin } = useAuthValidation();

    const login = async () => {
        setError('');

        const errorMessage = validateLogin(email, password);
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
            <Button title="Login" onPress={login} disabled={loading}/>
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
        </View>
    );
}

export default LoginScreen;