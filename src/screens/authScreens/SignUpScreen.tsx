import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, KeyboardAvoidingView, Platform, Alert, BackHandler } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from '@react-native-firebase/auth';
import { getFirestore, collection, doc, setDoc, serverTimestamp } from '@react-native-firebase/firestore';
import { AuthStackParamList } from '../../navigation/AuthNavigation';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ms } from 'react-native-size-matters';
import Toast from 'react-native-toast-message';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignUp'>

const SignUp = ({navigation} : Props) => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

     useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                navigation.replace('Login');
                return true;
            };

            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => subscription?.remove();
        }, [navigation])
    );

    const handleSignUp = async () => {
        if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
            Toast.show({
                type: 'error',
                text1: 'Missing Information',
                text2: 'Please fill in all fields',
                visibilityTime: 3000,
            })
            return;
        }

        setLoading(true);
        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user

            await updateProfile(user, { displayName: firstName });

            await sendEmailVerification(user);

            const db = getFirestore();
            const userCollection = collection( db, 'users');

            await setDoc(doc(userCollection, user.uid), {
                firstname : firstName,
                lastname : lastName,
                email: email,
                createdAt: serverTimestamp(),
            }); 

        } catch (error: any) {

            let errorTitle = "Sign Up Error"
            let errorMessage = 'An error occured during signup'

            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorTitle = 'Email Already In Use';
                    errorMessage = 'The email address is already in use by another account';
                    break;
                case 'auth/invalid-email':
                    errorTitle = 'Invalid Email';
                    errorMessage = 'The email address is not valid';
                    break;
                case 'auth/weak-password':
                    errorTitle = 'Weak Password';
                    errorMessage = 'The password should be at least 6 characters';
                    break;
                default:
                    errorMessage = error.message || 'Sign Up Failed';
            }
            Toast.show({
                type: 'error',
                text1: errorTitle,
                text2: errorMessage,
                visibilityTime: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

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
                        <View style={styles.nameContainer}>
                            <View style={styles.nameInputWrapper}>
                                <Input
                                    label="First Name"
                                    value={firstName}
                                    autoCapitalize='words'
                                    onChangeText={setFirstName}
                                />
                            </View>
                            <View style={styles.nameInputWrapper}>
                                <Input
                                    label="Last Name"
                                    value={lastName}
                                    autoCapitalize='words'
                                    onChangeText={setLastName}
                                />
                            </View>
                        </View>
                        <Input
                            label="Email"
                            value={email}
                            keyboardType="email-address"
                            autoCapitalize='none'
                            onChangeText={setEmail}
                        />
                        <Input
                            label="Password"
                            isPassword={true}
                            value={password}
                            autoCapitalize='none'
                            onChangeText={setPassword}
                        />
                    </View>
                    <Button
                        title={loading ? "Signing Up..." : "Sign Up"}
                        variant="primary"
                        style={styles.signUpButton}
                        onPress={handleSignUp}
                        disabled={loading}
                        disabledTextStyle={{ color: '#fff' }}
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
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        color: '#1a1a1a',
        fontSize: ms(28),
        fontWeight: 'bold',
    },
    subtitle: {
        color: '#1a1a1a',
        fontSize: ms(14),
        fontWeight: '500',
    },
    nameContainer: {
        flexDirection: 'row',
        gap: wp(2),
    },
    nameInputWrapper: {
        flex: 1,
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
        color: '#007AFF',
        textDecorationLine: 'underline'
    }
});

export default SignUp;