import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ms } from 'react-native-size-matters';


const Greetings = ({userName = 'user'}) => {
    const [ greeting, setGreeting ] = useState('');

    const getGreeting = () => {
        const hour = new Date().getHours();

        if ( hour >= 6 && hour < 12 ) {
            return 'Good Morning,';
        } else if ( hour >= 12 && hour < 18 ) {
            return 'Good Afternoon,';
        } else {
            return 'Good Evening,';
        };
    };

    const updateGreeting = () => {
        setGreeting(getGreeting());
    };

    useEffect(() => {
        updateGreeting();

        const interval = setInterval(() => {
            updateGreeting();
        }, 60000);

        return () => clearInterval(interval);

    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.greetingText}>
                {greeting}
            </Text>

            <Text style={styles.userName}>
                {userName}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    greetingText: {
        fontSize: ms(18),
        fontWeight: '600',
    },
    userName: {
        fontSize: ms(18),
        fontWeight: '500',
    },
});

export default Greetings;