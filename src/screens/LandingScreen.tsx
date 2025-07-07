import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from '../styles/styles';
import { useNavigation } from '@react-navigation/native';

const LandingScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container} testID="landing-screen">
            <Text style={styles.h1}>Landing Page</Text>
            <Text>Welcome to the landing page of our application!</Text>

            <View style={styles.buttonContainer}>
                <Button title="Login" onPress={() => navigation.navigate('Login')} />
                <Button title="Sign up" onPress={() => navigation.navigate('SignUp')} />
            </View>
        </View>
    );
};

export default LandingScreen;
