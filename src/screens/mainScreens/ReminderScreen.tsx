import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { ms } from 'react-native-size-matters';

const Reminder = () => {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.content}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    Reminders
                </Text>
                <MaterialIcons name='history' size={30}/>
            </View>
            <View style={styles.scheduleContainer}>
                <Text style={styles.title}>
                    Schedules
                </Text>
            </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: wp(5),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: ms(10),
    },
    title: {
        fontSize: ms(18),
        fontWeight: '600',
    },
    scheduleContainer: {

    },
});

export default Reminder;