import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Orientation from 'react-native-orientation-locker'
import AuthNavigation from './navigation/AuthNavigation';
import MainNavigation from './navigation/MainNavigation';
import AppNavigation from './navigation/AppNavigation';
import { StatusBar } from 'react-native';

const App = () => {
    useEffect(() => {
        Orientation.lockToPortrait();
        return() => {
            Orientation.unlockAllOrientations();
        };
    }, []);

    useEffect(() => {
        StatusBar.setBarStyle('dark-content', true);
    }, []);

    return (
        <SafeAreaProvider>
            <MainNavigation />
            {/* <MainNavigation /> */}
            {/* <AppNavigation /> */}
        </SafeAreaProvider>
    );
};

export default App;