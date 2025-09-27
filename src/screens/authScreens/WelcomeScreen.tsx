import { View, Text, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthStackParamList } from '../../navigation/AuthNavigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ms } from 'react-native-size-matters';
import Button from '../../components/UI/Button';

type Props = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

const Welcome = ({ navigation }: Props) => {

    const handleGetStarted = async () => {
        try {
            await AsyncStorage.setItem('hasLaunched', 'true');
            navigation.navigate('SignUp');
        } catch (e) {
            console.error("Failed to save launch flag", e);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image
                style={styles.backgroundImage}
                source={require('../../assets/images/wave.png')}
                resizeMode="cover"
            />

            <View style={styles.content}>
                {/* Header Section */}
                <View style={styles.header}>
                    <Text style={styles.title}>
                        Welcome to KinCare
                    </Text>
                    <Text style={styles.subtitle}>
                        Your Family's Health Companion App
                    </Text>
                </View>

                {/* Button Section */}
                <View style={styles.buttonContainer}>
                    <Button
                        title='Get Started'
                        onPress={handleGetStarted}
                    />
                </View>
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
        height: hp(65),
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(8),
    },
    header: {
        alignItems: 'center',
        marginTop: hp(8),
    },
    title: {
        color: '#1a1a1a',
        fontSize: ms(30),
        fontWeight: 'bold',
    },
    subtitle: {
        marginTop: hp(.8),
        fontSize: ms(14),
        fontWeight: '600',
    },
    buttonContainer: {
        width: '100%',
        paddingBottom: hp(2),
    },
});

export default Welcome;