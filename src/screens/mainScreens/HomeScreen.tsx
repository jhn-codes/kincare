import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, BackHandler, ToastAndroid } from 'react-native'
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { doc, getDoc, getFirestore } from '@react-native-firebase/firestore';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ms } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import Greeting from '../../components/UI/Greetings';
import DaySelector from '../../components/UI/DaySelector';
import HomeModal from '../../components/modals/HomeModal';

const Home = () => {
    const [initializing, setInitializing] = useState<boolean>(true);
    const [selectedDay, setSelectedDay] = useState<string>('');
    const [ firstName, setFirstName ] = useState<string>('User');
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    //Prevents the user from accidentally closing the app
    useFocusEffect(
        React.useCallback(() => {
            let backPressedOnce = false;

            const onBackPress = () => {
                if (backPressedOnce) {
                    BackHandler.exitApp();
                    return true;
                }

                backPressedOnce = true;
                ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
                
                setTimeout(() => {
                    backPressedOnce = false;
                }, 2000);

                return true;
            };

            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => subscription?.remove();
        }, [modalVisible])
    );

    //To display user firstname for greetings
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (authenticatedUser) => {

            if (authenticatedUser) {
                try {
                    const db = getFirestore();
                    const userDoc = await getDoc(doc(db, 'users', authenticatedUser.uid));
                    const data = userDoc.data();
                    
                    if (data) {
                        const firstname = data.firstname || 'User';
                        setFirstName(firstname);
                    } else {
                        const fallbackName = authenticatedUser.displayName?.split(' ')[0] || 'User';
                        setFirstName(fallbackName);
                    }
                } catch (error) {
                    const fallbackName = authenticatedUser.displayName?.split(' ')[0] || 'User';
                    setFirstName(fallbackName);
                }
            } else {
                setFirstName('User')
            }

            if (initializing) {
                setInitializing(false);
            }
        });

        return unsubscribe;
    }, []);

    const handleDaySelect = (selectedDate: string) => {
        setSelectedDay(selectedDate);
    };

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>

                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={openModal}>
                        <MaterialIcons name="menu" style={styles.icons} />
                    </TouchableOpacity>
                    <Greeting userName = {firstName}/> 
                    <TouchableOpacity>
                        <MaterialIcons name="notifications-none" style={styles.icons} />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <LinearGradient
                        colors={[ '#00ACC1', '#2196F3']}
                        style={styles.containerAppointmentBackground}
                    >
                        <Text style={styles.title}>Appointments Reminder</Text>

                        <ScrollView 
                            style={styles.appoinmentContainer}
                            nestedScrollEnabled={true}
                        >
                            <Text>Helllo</Text>
                            <Text>Helllo</Text>
                            <Text>Helllo</Text>
                            <Text>Helllo</Text>
                            <Text>Helllo</Text>
                            <Text>Helllo</Text>
                            <Text>Helllo</Text>
                            <Text>Helllo</Text>

                            <Text>Helllo</Text>
                            <Text>Helllo</Text>
                            <Text>Helllo</Text>
                            <Text>Helllo</Text>
                            <Text>Helllo</Text>
                            <Text>Helllo</Text>
                            <Text>Helllo</Text>
                            <Text>Helllo</Text>
                            <Text>Helllo</Text>
                            <Text>Helllo</Text>
                            <Text>Helllo</Text>
                            <Text>Helllo</Text>
                            <Text>Helllo</Text>
                        </ScrollView>
                    </LinearGradient>

                    <LinearGradient
                        colors={[ '#00ACC1', '#2196F3']}
                        style={styles.containerMedicationBackground}
                    >
                        <Text style={[styles.title, {marginBottom: 0}]}>Medications Reminder</Text>

                        <DaySelector
                            onDaySelect={handleDaySelect}
                            selectedDay={selectedDay}
                            numberOfDays={5} 
                        />

                        <ScrollView
                            style={styles.appoinmentContainer}
                            nestedScrollEnabled={true}
                        >
                            <Text>Helllo</Text>
                            <Text>Helllo</Text>
                            <Text>Helllo</Text>
                            <Text>Helllo</Text>
                            <Text>Helllo</Text>
                            <Text>Helllo</Text>
                            <Text>Helllo</Text>
                            <Text>Helllo</Text>

                            <Text>Helllo</Text>
                            <Text>Helllo</Text>
                            <Text>Helllo</Text>
                            <Text>Helllo</Text>
                            <Text>Helllo</Text>
                            <Text>Helllo</Text>
                            <Text>Helllo</Text>
                            <Text>Helllo</Text>
                            <Text>Helllo</Text>
                            <Text>Helllo</Text>
                            <Text>Helllo</Text>
                            <Text>Helllo</Text>
                            <Text>Helllo</Text>
                        </ScrollView>
                    </LinearGradient>
                </ScrollView>

                <HomeModal
                    visible={modalVisible}
                    onClose={closeModal}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: wp(5),
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: ms(10),
        marginBottom: ms(25),
    },
    icons: {
        fontSize: ms(28),
    },
    containerAppointmentBackground: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: hp(30),
        paddingHorizontal: wp(5),
        paddingVertical: hp(2),
        borderRadius: wp(4),
        marginBottom: hp(2),
    },
    containerMedicationBackground: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: hp(45),
        paddingHorizontal: wp(5),
        paddingVertical: hp(2),
        borderRadius: wp(4),
        marginBottom: hp(2),
    },
    title: {
        alignSelf: 'flex-start',
        marginBottom: hp(2),
        fontSize: ms(18),
        fontWeight: '600',
        color: '#fff'
    },
    appoinmentContainer: {
        width: '100%',
        marginBottom: hp(1),
        backgroundColor: '#fff',
        borderRadius: wp(2),
    },
});

export default Home;