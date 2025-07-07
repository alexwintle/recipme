import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthContext';
import { ActivityIndicator, View } from 'react-native';
import { AppStack } from './AppStack';
import { AuthStack } from './AuthStack';

export default function Navigation() {
    const { user, loading } = useContext(AuthContext);

    console.log('Navigation user:', user);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {user ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
}