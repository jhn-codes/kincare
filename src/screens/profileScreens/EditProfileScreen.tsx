import { Alert, StyleSheet, Text, View } from "react-native";
import { getAuth, onAuthStateChanged } from "@react-native-firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { ms } from "react-native-size-matters";
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import { useEffect, useState } from "react";
import { ProfileStackParamList } from "../../navigation/ProfileNavigation";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import Feather from "@react-native-vector-icons/feather";

interface UserData {
    firstname?: string;
    lastname?: string;
    email?: string;
}

type EditProfileNavigationProp = NativeStackNavigationProp<ProfileStackParamList, 'EditProfile'>;

const EditProfile = () => {
    const navigation = useNavigation<EditProfileNavigationProp>();
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [initialFirstName, setInitialFirstName] = useState<string>('');
    const [initialLastName, setInitialLastName] = useState<string>('');
    const [currentUser, setCurrentUSer] = useState<any>(null)
    const [isEditing, setIsEditing] =useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchAndSetUserData = async(authenticatedUser: any) => {
        try {
            const db = getFirestore();
            const userDoc = await getDoc(doc (db, 'users', authenticatedUser.uid));
            const data = userDoc.data() as UserData;

            const userFirstName = data.firstname || '';
            const userLastname  = data.lastname || '';
            const userEmail = authenticatedUser.email || '';

            setFirstName(userFirstName);
            setLastName(userLastname);
            setEmail(userEmail);

            setInitialFirstName(userFirstName);
            setInitialLastName(userLastname);
        } catch (error) {
            Alert.alert('Error', 'Could not load user data');
        }
    };

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (authenticatedUser) => {
            if (authenticatedUser) {
                setCurrentUSer(authenticatedUser);
                fetchAndSetUserData(authenticatedUser);
            } else {
                navigation.goBack();
            }
        });
        return unsubscribe;
    }, []);

    const handleSave = async () => {
        if (!currentUser) {
            Alert.alert('Error', 'User not authenticated');
            return;
        }

        setIsLoading(true);

        const isNameChanged = firstName !== initialFirstName || lastName !== initialLastName;

        try {
            if (isNameChanged) {
                const db = getFirestore();
                const useRef = doc(db, 'users', currentUser.uid);

                const updateData: UserData = {
                    firstname: firstName,
                    lastname: lastName,
                };

                await setDoc(useRef, updateData, { merge: true });

                setInitialFirstName(firstName);
                setInitialLastName(lastName);

                Alert.alert('Success', 'Your Profile has been updated!',
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                setIsEditing(false);
                                navigation.navigate('ProfileMain');
                            }
                        }
                    ],
                    {cancelable: false}
                );
            } else {
                Alert.alert('Info', 'No changes were made');
            }
            setIsEditing(false);
        } catch (error: any) {
            Alert.alert('Error', 'Failed to save profile. Please try again.')
        } finally {
            setIsLoading(false);
        }
    };

    const handleButtonPress = () => {
        if (isEditing) {
            handleSave();
        } else {
            setIsEditing(true);
        }
    };

    const handleCancel = () => {
        setFirstName(initialFirstName);
        setLastName(initialLastName);
        setIsEditing(false);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>
                    Personal Details
                </Text>
                <Text style={styles.headerBody}>
                    Review and update your profile information
                </Text>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>
                    Personal Information
                </Text>
                <Input
                    label="First Name"
                    value={firstName}
                    onChangeText={setFirstName}
                    editable={isEditing}
                    inputStyle={[
                        { color: isEditing ? '#1a1a1a' : '#8A8D91' }
                    ]}
                />

                <Input
                    label="Last Name"
                    value={lastName}
                    onChangeText={setLastName}
                    editable={isEditing}
                    inputStyle={[
                        { color: isEditing ? '#1a1a1a' : '#8A8D91' }
                    ]}
                />

                <View style={styles.emailInput}>
                    <Input
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        editable={false}
                        inputStyle={[styles.inputWithIcon, {color: '#8A8D91'}]}
                    />
                    <Feather name="lock" size={ms(16)} color='#8A8D91' style={styles.icon} />
                </View>

            </View>
                <View style={styles.buttonContainer}>
                    {isEditing && (
                        <Button
                            title="Cancel"
                            variant="secondary"
                            onPress={handleCancel}
                            style={[styles.buttonSize, styles.cancelButton]}
                        />
                    )}
                    <Button
                        title={isEditing ? (isLoading ? 'Saving...' : 'Save Changes') : 'Edit Profile'}
                        onPress={handleButtonPress}
                        style={[styles.buttonSize, styles.saveButton]}
                    />
                </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: wp(5)
    },
    header: {
        marginTop: hp(2),
        marginBottom: hp(3),
    },
    headerTitle: {
        marginBottom: hp(0.5),
        color: '#1a1a1a',
        fontSize: ms(16),
        fontWeight: '600',
    },
    headerBody: {
        fontSize: ms(14),
        color: '#777',
    },
    inputContainer: {
        backgroundColor: '#fff',
        borderRadius: ms(16),
        paddingVertical: hp(2),
        paddingHorizontal: wp(4),
        marginBottom: hp(3),
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: ms(16),
        elevation: 3,
    },
    inputTitle: {
        marginBottom: hp(2),
        paddingBottom: ms(8),
        borderBottomWidth: ms(1.5),
        borderBottomColor: '#f0f0f0',
        color: '#2196F3',
        fontSize: ms(14),
        fontWeight: '600',
    },
    emailInput: {
        position: 'relative',
    },
    inputWithIcon: {
        paddingRight: ms(12),
    },
    icon: {
        position: 'absolute',
        right: wp(5),
        top: hp(2.5),
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: hp(2),
    },
    buttonSize: {
        minWidth: wp(30),
    },
    cancelButton: {
        marginRight: wp(5),
    },
    saveButton: {
        alignSelf: 'flex-end',
    }
});

export default EditProfile;