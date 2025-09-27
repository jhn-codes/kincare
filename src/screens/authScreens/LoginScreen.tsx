import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, KeyboardAvoidingView, Platform, BackHandler, ToastAndroid } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth';
import { AuthStackParamList } from '../../navigation/AuthNavigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ms } from 'react-native-size-matters';
import Toast from 'react-native-toast-message';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const Login = ({navigation} : Props) => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);

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
        }, [])
    );

	const handleLogin = async () => {
		if (!email || !password) {
			Toast.show({
				type: 'error',
				text1: 'Missing Information',
				text2: 'Please enter both email and password',
				visibilityTime: 3000,
			});
			return;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			Toast.show({
				type: 'error',
				text1: 'Invalid Email',
				text2: 'Please enter a valid email address',
				visibilityTime: 3000,
			});
			return;
		};

		setLoading(true);

		try {
			const auth = getAuth();
			await signInWithEmailAndPassword(auth, email, password);
			
		} catch (error: any) {

			let errorMessage = 'An error occurred during login';

			switch (error.code) {
				case 'auth/invalid-email':
					errorMessage = 'Invalid email address';
					break;
				case 'auth/user-disabled':
					errorMessage = 'This account has been disabled';
					break;
				case 'auth/too-many-requests':
					errorMessage = 'Too many failed login attempts. Please try again later';
					break;
				case 'auth/invalid-credential':
					errorMessage = 'Invalid email or password';
					break;
				default:
					errorMessage = error.message || 'Login failed';
			}
			Toast.show({
				type: 'error',
				text1: 'Login Error',
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
					{/* Title */}
					<View style={styles.headerContainer}>
						<Text style={styles.title}>
							Hello, {'\n'}
							Welcome Back!👋
						</Text>
						<Text style={styles.subtitle}>
							Please login to continue
						</Text>
					</View>
					{/* Input Section */}
					<View style={styles.inputContainer}>
						<Input
							label="Email"
							value={email}
							onChangeText={setEmail}
							keyboardType="email-address"
							autoCapitalize="none"
							editable={!loading}
						/>
				
						<Input
							label="Password"
							isPassword={true}
							value={password}
							onChangeText={setPassword}
							containerStyle={styles.input}
							editable={!loading}
						/>
					</View>
					<Button
						title="Forgot password?"
						variant="text"
						onPress={() => navigation.navigate('ForgotPassword')}
						textStyle={styles.forgotPasswordText}
						style={styles.forgotPassword}
						disabled={loading}
					/>
					<Button
						style={styles.loginButton}
						title={loading ? "Signing In..." : "Login"}
						onPress={handleLogin}
						disabled={loading}
						disabledTextStyle={{ color: '#fff' }}
					/>
					<View style={styles.signUpContainer}>
						<Button
							title="Doesn't have an account?"
							variant='text'
							disabled={true}
						/>
						<Button
							title="Sign Up"
							variant="text"
							onPress={() => navigation.navigate('SignUp')}
							textStyle={styles.signUpText}
							disabled={loading}
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
	inputContainer: {
		width: '100%',
        marginBottom: hp(1),
	},
    input: {
        marginBottom: 0,
    },
	forgotPassword: {
		alignSelf: 'flex-end',
		marginBottom: hp(2),
	},
	forgotPasswordText: {
		fontSize: ms(12),
		color: '#007AFF',
	},
	loginButton: {
		width: '100%'
	},
	signUpContainer: {
		marginTop: hp(1),
		flexDirection: 'row',
	},
	signUpText: {
		fontWeight: '600',
		color: '#007AFF',
		textDecorationLine: 'underline',
	},
});

export default Login;