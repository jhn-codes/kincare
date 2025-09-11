import React, { useState } from 'react';
import { Alert, View, Text, Image, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthStackParamList } from '../../navigation/AuthNavigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ms } from 'react-native-size-matters';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const Login = ({navigation} : Props) => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [loading, isLoading] = useState<boolean>(false);

const handleLogin = () => {
	if(!email || !password) {
	   Alert.alert('Invalid', `I'll fuck you first`);
	} else {
		//navigation.navigate('Home');
		Alert.alert('Bakla', 'ni edgar')
	};
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
						/>
				
						<Input
							label="Password"
							isPassword={true}
							value={password}
							onChangeText={setPassword}
							containerStyle={styles.input}
						/>
					</View>
					<Button
						title="Forgot password?"
						variant="text"
						onPress={() => navigation.navigate('ForgotPassword')}
						textStyle={styles.forgotPasswordText}
						style={styles.forgotPassword}
					/>
					<Button
						style={styles.loginButton}
						title="Login"
						onPress={handleLogin}
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
		color: '#60a5fa',
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
        color: '#60a5fa',
		textDecorationLine: 'underline',
	},
});

export default Login;