import React from 'react';
import { AuthProvider } from './src/contexts/AuthContext';
import Navigation from './src/navigation/RootNavigation';
import '@expo/metro-runtime';

export default function App() {
    return (
        <AuthProvider>
            <Navigation />
        </AuthProvider>
    );
}