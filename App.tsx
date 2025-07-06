import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/contexts/AuthContext';
import Navigation from './src/navigation';
import '@expo/metro-runtime';

export default function App() {
    return (
        <AuthProvider>
            <Navigation />
            <StatusBar style="auto" />
        </AuthProvider>
    );
}