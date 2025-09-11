import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { ms } from "react-native-size-matters";

interface DayInfo {
    date: number;
    dayName: string;
    fullDate: Date;
    isToday: boolean;
}

interface DaySelectorProps {
    onDaySelect: (selectedDate: string) => void;
    selectedDay?: string;
    numberOfDays?: number;
}

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const DaySelector: React.FC<DaySelectorProps> = ({
    onDaySelect,
    selectedDay = '',
    numberOfDays = 5,
}) => {
    const [days, setDays] = useState<DayInfo[]>([]);
    const [currentMonth, setCurrentMonth] = useState<string>('');

    useEffect(() => {
        const today = new Date();
        const generatedDays: DayInfo[] = [];

        for (let i = 0; i < numberOfDays; i++) {
            const currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);

            generatedDays.push({
                date: currentDate.getDate(),
                dayName: dayNames[currentDate.getDay()],
                fullDate: currentDate,
                isToday: i === 0,
            });
        }

        setDays(generatedDays);
        setCurrentMonth(`${monthNames[today.getMonth()]} ${today.getFullYear()}`);

        if (!selectedDay && generatedDays.length > 0) {
            onDaySelect(generatedDays[0].fullDate.toDateString());
        }
    }, [numberOfDays, selectedDay, onDaySelect]);

    const isSelected = (day: DayInfo) => selectedDay === day.fullDate.toDateString();

    const getButtonStyle = (day: DayInfo) => {
        const isSelectedDay = isSelected(day);
        return [
            styles.dayButton,
            isSelectedDay && styles.selectedDayButton,
            day.isToday && styles.todayButton,
        ];
    };

    const getTextStyle = (day: DayInfo, isDateNumber = false) => {
        const isSelectedDay = isSelected(day);
        return [
            isDateNumber ? styles.dayNumber : styles.dayName,
            isSelectedDay && styles.selectedDayText,
            day.isToday && styles.todayText,
            day.isToday && isSelectedDay && styles.todaySelectedText,
        ];
    };

    return (
        <View style={styles.container}>
            <View style={styles.monthHeader}>
                <Text style={styles.monthText}>{currentMonth}</Text>
            </View>
            <View style={styles.daysContainer}>
                {days.map((day) => (
                    <TouchableOpacity
                        key={day.fullDate.toDateString()}
                        style={getButtonStyle(day)}
                        onPress={() => onDaySelect(day.fullDate.toDateString())}
                        activeOpacity={0.7}
                    >
                        <Text style={getTextStyle(day)}>{day.dayName}</Text>
                        <Text style={getTextStyle(day, true)}>{day.date}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: hp(1),
    },
    monthHeader: {
        alignItems: 'flex-start',
        paddingVertical: hp(1),
    },
    monthText: {
        fontSize: ms(14),
        fontWeight: '500',
    },
    daysContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    dayButton: {
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: wp(14),
        padding: wp(2),
        borderWidth: 1,
        borderColor: '#f8f8f8',
        borderRadius: wp(2),
    },
    selectedDayButton: {
        backgroundColor: '#f8f8f8',
    },
    todayButton: {
        borderColor: '#333',
    },
    dayName: {
        fontSize: ms(12),
        color: '#444',
    },
    dayNumber: {
        fontSize: ms(14),
        fontWeight: '500',
        color: '#444',
        marginBottom: ms(2),
    },
    selectedDayText: {
        color: '#000000',
    },
    todayText: {
        color: '#000',
        fontWeight: '500',
    },
    todaySelectedText: {
        color: '#00ACC1',
    },
});

export default DaySelector;