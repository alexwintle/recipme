import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';
import { useNavigation } from '@react-navigation/native';

const LandingScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container} testID="landing-screen">
            <Text style={styles.h1}>Landing Page</Text>
            <Text>Welcome to the landing page of our application!</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                    <Text>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sign Up')}>
                    <Text>Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LandingScreen;
