import { View, Text, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/UI/Button';
import { AuthStackParamList } from '../../navigation/AuthNavigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ms  } from 'react-native-size-matters';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type Props = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

const Welcome = ({navigation} : Props) => {
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
                        onPress={() => navigation.navigate('SignUp')}
                    />
                </View>
            </View>
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
        fontSize: ms(30),
        fontWeight: 'bold',
        fontFamily:'RedRose-Regular',
    },
    subtitle: {
        marginTop: hp(.8),
        fontSize: ms(14),
        fontWeight: 600,
        fontFamily:'sans-serif',
    },
    buttonContainer: {
        width: '100%',
        paddingBottom: hp(2),
    },
});

export default Welcome;