import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import { AuthContext } from '../contexts/AuthContext';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
    const { user } = useContext(AuthContext);

    console.log('Navigation user:', user);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {user ?
                    <Stack.Screen name="Home" component={HomeScreen} />
                    :
                    <Stack.Screen name="SignIn" component={LoginScreen} />
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}
