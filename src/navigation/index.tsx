import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../pages/SignIn';
import { AuthContext } from '../contexts/AuthContext';
import Home from '../pages/Home';

const Stack = createNativeStackNavigator();

export default function Navigation() {
    const { user } = useContext(AuthContext);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {user ?
                    <Stack.Screen name="Home" component={Home} />
                    :
                    <Stack.Screen name="SignIn" component={SignIn} />
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}
