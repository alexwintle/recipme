import React from "react";
import { View, Text } from "react-native";
import styles from "../styles/styles";

const SignUpScreen = () => {

    return (
        <View style={styles.container} testID="sign-up-screen">
            <Text style={styles.h1}>Sign Up</Text>
        </View>
    )
}

export default SignUpScreen;