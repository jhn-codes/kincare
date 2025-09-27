import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ms } from 'react-native-size-matters';
import MaterialIcons from '@react-native-vector-icons/material-icons';

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const navigateMonth = (direction: number) => {
    setCurrentMonth(prevMonth => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(prevMonth.getMonth() + direction);
      return newMonth;
    });
  };

  const handleDateSelect = (date: React.SetStateAction<Date>) => {
    setSelectedDate(date);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date && 
           date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const isSelected = (date: Date) => {
    return date && 
           selectedDate &&
           date.getDate() === selectedDate.getDate() &&
           date.getMonth() === selectedDate.getMonth() &&
           date.getFullYear() === selectedDate.getFullYear();
  };

  const days = getDaysInMonth(currentMonth);

  const renderDayButton = (date: Date | null, index: React.Key | null | undefined) => {
    if (!date) {
      return <View key={index} style={styles.dayCell} />;
    }

    const selected = isSelected(date);
    const today = isToday(date);
    const otherMonth = date.getMonth() !== currentMonth.getMonth();

    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.dayButton,
          selected && styles.dayButtonSelected,
          today && !selected && styles.dayButtonToday
        ]}
        onPress={() => handleDateSelect(date)}
        activeOpacity={0.7}
      >
        <Text style={[
          styles.dayText,
          selected && styles.dayTextSelected,
          today && !selected && styles.dayTextToday,
          otherMonth && styles.dayTextOtherMonth
        ]}>
          {date.getDate()}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigateMonth(-1)}
          activeOpacity={0.7}
        >
          <MaterialIcons name="chevron-left" size={ms(24)} color="#666" />
        </TouchableOpacity>
        
        <Text style={styles.monthTitle}>
          {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </Text>
        
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigateMonth(1)}
          activeOpacity={0.7}
        >
          <MaterialIcons name="chevron-right" size={ms(24)} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Days Header */}
      <View style={styles.daysHeader}>
        {daysOfWeek.map(day => (
          <View key={day} style={styles.dayHeaderCell}>
            <Text style={styles.dayHeaderText}>{day}</Text>
          </View>
        ))}
      </View>

      {/* Calendar Grid */}
      <View style={styles.daysGrid}>
        {days.map((date, index) => renderDayButton(date, index))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: wp(4),
    paddingVertical: ms(16),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: ms(20),
  },
  navButton: {
    width: ms(40),
    height: ms(40),
    borderRadius: ms(20),
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthTitle: {
    fontSize: ms(18),
    fontWeight: '600',
    color: '#333',
  },
  daysHeader: {
    flexDirection: 'row',
    marginBottom: ms(8),
  },
  dayHeaderCell: {
    flex: 1,
    height: ms(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayHeaderText: {
    fontSize: ms(14),
    fontWeight: '500',
    color: '#666',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: `${100 / 7}%`,
    height: ms(48),
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayButton: {
    width: `${100 / 7}%`,
    height: ms(48),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ms(12),
  },
  dayButtonToday: {
    backgroundColor: '#E3F2FD',
  },
  dayButtonSelected: {
    backgroundColor: '#2196F3',
  },
  dayText: {
    fontSize: ms(16),
    fontWeight: '500',
    color: '#333',
  },
  dayTextToday: {
    color: '#1976D2',
    fontWeight: '600',
  },
  dayTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  dayTextOtherMonth: {
    color: '#CCC',
  },
});

export default CalendarComponent;