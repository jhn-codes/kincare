import React, { useEffect } from 'react';
import AppNavigation from './navigation/AppNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Orientation from 'react-native-orientation-locker'
import Toast from 'react-native-toast-message';
import { toastConfig } from './config/toastConfig';

const App = () => {
    useEffect(() => {
        Orientation.lockToPortrait();
        return() => {
            Orientation.unlockAllOrientations();
        };
    }, []);

    return (
        <>
            <SafeAreaProvider>
                <AppNavigation />
            </SafeAreaProvider>
            <Toast config={toastConfig}/>
        </>
    );
};

export default App;