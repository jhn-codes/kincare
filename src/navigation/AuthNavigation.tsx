import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, ActivityIndicator } from 'react-native';
import Welcome from "../screens/authScreens/WelcomeScreen";
import Login from "../screens/authScreens/LoginScreen";
import SignUp from "../screens/authScreens/SignUpScreen";
import ForgotPassword from "../screens/authScreens/ForgotPasswordScreen";

export type AuthStackParamList = {
    Welcome: undefined,
    Login: undefined;
    SignUp: undefined;
    ForgotPassword: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigation = () => {
    const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

    useEffect(() => {
        const checkFirstLaunch = async () => {
            try {
                const hasLaunched = await AsyncStorage.getItem('hasLaunched');
                if (hasLaunched === null) {
                    setIsFirstLaunch(true);
                } else {
                    setIsFirstLaunch(false);
                }
            } catch (e) {
                console.error("Failed to read from AsyncStorage", e);
                setIsFirstLaunch(false);
            }
        };
        checkFirstLaunch();
    }, []);

    if (isFirstLaunch === null) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}
            initialRouteName={isFirstLaunch ? "Welcome" : "Login"}
        >
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
    );
};

export default AuthNavigation;