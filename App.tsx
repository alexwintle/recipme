import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AuthProvider } from './src/contexts/AuthContext';
import Navigation from './src/navigation';

export default function App() {
    return (
        <AuthProvider>
            <Navigation />
            <StatusBar style="auto" />
        </AuthProvider>
    );
}