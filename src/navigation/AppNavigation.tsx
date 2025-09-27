import React, { useState, useEffect } from 'react';
import { FirebaseAuthTypes, getAuth, onAuthStateChanged, reload } from '@react-native-firebase/auth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './AuthNavigation';
import MainNavigation from './MainNavigation';
import VerificationScreen from '../screens/authScreens/VerificationScreen';

export type RootStackParamList = {
    Main: undefined;
    Auth: undefined;
    Verification: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation: React.FC = () => {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

    const handleAuthStateChange = (currentUser: FirebaseAuthTypes.User | null) => {
        setUser(currentUser);

        if (initializing) {
            setInitializing(false);
        }
    };

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, handleAuthStateChange);
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (user && !user.emailVerified) {
            const interval  = setInterval(async() => {
                try {
                    await reload(user);
                    const refreshedUser = getAuth().currentUser;
                    if (refreshedUser?.emailVerified !== user.emailVerified) {
                        setUser(refreshedUser);
                    }
                } catch (error) {

                }
            }, 3000);

            return () => clearInterval(interval);
        }
    }, [user]);

    if (initializing) {
        return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {user ? (
                    user.emailVerified ? (
                        <Stack.Screen name="Main" component={MainNavigation} />
                    ) : (
                        <Stack.Screen name="Verification" component={VerificationScreen} />
                    )
                ) : (
                    <Stack.Screen name="Auth" component={AuthNavigation} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;