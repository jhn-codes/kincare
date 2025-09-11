import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ms } from 'react-native-size-matters';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import Greeting from '../../components/UI/Greetings';
import DaySelector from '../../components/UI/DaySelector';
import { useState } from 'react';

const Home = () => {
        const [selectedDay, setSelectedDay] = useState<string>('');

    const handleDaySelect = (selectedDate: string) => {
        setSelectedDay(selectedDate);
        //add additional logic here for when a day is selected
        console.log('Selected day:', selectedDate);
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity>
                            <MaterialIcons name="menu" style={styles.icons} />
                        </TouchableOpacity>
                        <Greeting userName='Kristal May'/> 
                        <TouchableOpacity>
                            <MaterialIcons name="notifications-none" style={styles.icons} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        <LinearGradient colors={[ '#00ACC1', '#2196F3']} style={styles.containerBackground}>
                            <Text style={styles.title}>
                                Appointments Reminder
                            </Text>
                            <ScrollView style={styles.appoinmentContainer}>
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

                        <LinearGradient colors={[ '#00ACC1', '#2196F3']} style={styles.containerMedicationBackground}>
                            <Text style={[styles.title, {marginBottom: 0}]}>
                                Medications Reminder
                            </Text>

                            <DaySelector
                                onDaySelect={handleDaySelect}
                                selectedDay={selectedDay}
                                numberOfDays={5} 
                            />

                            
                            <ScrollView style={styles.appoinmentContainer}>
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
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
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
    containerBackground: {
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
        fontWeight: '700',
    },
    appoinmentContainer: {
        width: '100%',
        marginBottom: hp(1),
        backgroundColor: '#f8f8f8',
        borderRadius: wp(2),
    }
});

export default Home;