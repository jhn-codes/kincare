import { View, Text, Image, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import { ms } from 'react-native-size-matters';
import { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigation';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignUp'>

const SignUp = ({navigation} : Props) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return (
        <SafeAreaView style={styles.container}>
            <Image
                style={styles.backgroundImage}
                source={require('../../assets/images/wave_1.png')}
                resizeMode="cover"
            />
            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.content}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.title}>
                            Let's {'\n'}
                            Get Started
                        </Text>
                        <Text style={styles.subtitle}>
                            Please fill the details to create an account
                        </Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Input
                            label="Name"
                            value={name}
                            onChangeText={setName}
                        />
                        <Input
                            label="Email"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <Input
                            label="Password"
                            isPassword={true}
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>
                    <Button
                        title="Sign Up"
                        variant="primary"
                        style={styles.signUpButton}
                    />
                    <View style={styles.loginContainer}>
                        <Button
                            title="Already have an account?"
                            variant="text"
                            disabled={true}
                        />
                        <Button
                            title="Login"
                            variant="text"
                            onPress={() => navigation.navigate('Login')}
                            textStyle={styles.loginLinkText}
                        />
                    </View>
                    {/* <Button
                        title='Join with code'
                        variant='text'
                    /> */}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    backgroundImage: {
        position: 'absolute',
        width: wp(100),
        height: hp(30),
    },
    keyboardView: {
        flex: 1,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingTop: hp(20),
        paddingHorizontal: wp(5),
    },
    headerContainer: {
        alignSelf: 'flex-start',
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
    inputContainer: {
        width: '100%',
    },

    signUpButton: {
        width: '100%',
    },
    loginContainer: {
        flexDirection: 'row',
        marginTop: hp(1),
    },
    loginLinkText: {
        color: '#60a5fa',
        textDecorationLine: 'underline'
    }
});

export default SignUp;