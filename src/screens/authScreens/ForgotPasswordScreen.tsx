import React, { use, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { getAuth, sendPasswordResetEmail } from '@react-native-firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigation';
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ms } from 'react-native-size-matters';
import Toast from 'react-native-toast-message';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';

type Props = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

const ForgotPassword = ({navigation } : Props) => {
    const[email, setEmail] = useState<string>('');
    const[loading, setLoading] = useState<boolean>(false);

    const handlePasswordReset = async () => {
        if (!email) {
            Toast.show({
                type: 'error',
                text1: 'Missing Information',
                text2: 'Please enter your email address',
                visibilityTime: 3000,
            });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Toast.show({
                type: 'error',
                text1: 'Invalid email',
                text2: 'Please enter a valid email address',
                visibilityTime: 3000,
            });
            return;
        }

        setLoading(true);

        try {
            const auth = getAuth();
            await sendPasswordResetEmail(auth, email);

            Toast.show({
                type: 'success',
                text1: 'Password Reset Email Sent',
                text2: 'Please check your email to reset your password',
                visibilityTime: 4000,
            });

            setTimeout(() => {
                navigation.navigate('Login');
            }, 2000)

        } catch (error: any) {
            let errorMessage = 'An error occurred while trying to reset the password';

            switch (error.code) {
                case 'auth/invalid-email':
                    errorMessage = 'Invalid email address';
                    break;
                case 'auth/too-many-requests':
                    errorMessage = 'Too many requests. Please try again later.';
                    break;
                case 'auth/too-many-requests':
                    errorMessage = 'Too many requests. Please try again later.';
                    break;
                default:
                    errorMessage = error.message;
            }
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: errorMessage,
                visibilityTime: 3000,
            })
        } finally {
            setLoading(false);
        }
    };

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
                    value={email}
                    onChangeText={setEmail}
                    keyboardType='email-address'
                    autoCapitalize='none'
                    editable={!loading}

                />
                <Button
                    title= {loading ? 'Sending...' : 'Send Reset Link'}
                    onPress={handlePasswordReset}
                    disabled={loading}
                    disabledTextStyle={{ color: '#fff'}}
                />

                <Button
                    title='Go Back to Login'
                    variant='text'
                    onPress={() => navigation.goBack()}
                    disabled={loading}
                    textStyle={styles.goBackButton}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        color: '#1a1a1a',
        fontSize: ms(28),
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: ms(14),
        color: '#1a1a1a',
        fontWeight: '500',
    },
    goBackButton: {
        color: '#60a5fa',
        marginTop: hp(1),
    }
});

export default ForgotPassword;