import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AuthProvider } from './src/contexts/AuthContext';

export default function App() {
    return (
        <AuthProvider>
            <View style={styles.container}>
                <Text>Welcome to Recipme!!!!!</Text>
                <StatusBar style="auto" />
            </View>
        </AuthProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
