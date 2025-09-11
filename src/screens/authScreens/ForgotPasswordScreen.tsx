import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ms } from 'react-native-size-matters';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ForgotPassword = () => {

    return (
        <SafeAreaView style={styles.container}>
            <Image
                style={styles.backgroundImage}
                source={require('../../assets/images/wave_1.png')}
            />
            <View style={styles.content}>
                
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>
                        Forgot Password
                    </Text>
                    <Text style={styles.subtitle}>
                        Enter your email address
                    </Text>
                </View>

                <Input
                    label="Email Address"
                />
                <Button
                    title="Continue"
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    backgroundImage: {
        position: 'absolute',
        width: wp(100),
        height: hp(30),
    },
    content: {
        flex: 1,
        paddingTop: hp(20),
        paddingHorizontal: wp(5),
    },
    headerContainer: {
        marginBottom: hp(1.5),
    },
    title: {
        marginBottom: hp(3),
        fontSize: ms(28),
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: ms(14),
        fontWeight: '500',
    },
});

export default ForgotPassword;