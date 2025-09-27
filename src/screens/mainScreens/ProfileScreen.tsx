import { useEffect, useMemo, useState } from "react";
import { Alert, PermissionsAndroid, Platform, ScrollView, StyleSheet, Text, Image, TouchableOpacity, View } from "react-native";
import { getAuth, onAuthStateChanged, signOut } from "@react-native-firebase/auth";
import { doc, getDoc, getFirestore, updateDoc } from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "../../navigation/ProfileNavigation";
import { ImagePickerResponse, launchCamera, MediaType, CameraOptions, launchImageLibrary } from "react-native-image-picker";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { ms } from "react-native-size-matters";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import Feather, { FeatherIconName } from "@react-native-vector-icons/feather";
import LinearGradient from "react-native-linear-gradient";
import Toast from "react-native-toast-message";
import ProfilePictureModal from "../../components/modals/ProfileModal";

interface UserData {
    profileImage: string;
    firstname?: string;
    lastname?: string;
    familyGroupRole?: string;
    email?: string;
}

interface ProfileMenuItem {
    id: number;
    title: string;
    iconName: FeatherIconName;
    action: () => void;
}

type ProfileNavigationProps = NativeStackNavigationProp<ProfileStackParamList>;

const Profile = () => {
    const navigation = useNavigation<ProfileNavigationProps>();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [initializing, setInitializing] = useState(true);
    const [name, setName] = useState<string>('');
    const [initial, setInitial] = useState<string>('');
    const [userRole, setUserRole] = useState<string>('');
    const [profileImage, setProfileImage] = useState<string>('');
    const [currentUser, setCurrentUSer] = useState<any>(null);

    //To display the user full name and initial in display picture
    const fetchUSerData = async (authenticatedUser: any) => {
        try {
            const db = getFirestore();
            const userDoc = await getDoc(doc(db, 'users', authenticatedUser.uid));
            const data = userDoc.data() as UserData;

            const firstname = data.firstname || '';
            const lastname = data.lastname || '';
            const fullname = `${firstname} ${lastname}`.trim();
            const familyGroupRole = data.familyGroupRole || '';
            const initial = `${firstname.trim().charAt(0).toUpperCase()}${lastname.trim().charAt(0).toUpperCase()}`;

            setName(fullname);
            setInitial(initial);
            setUserRole(familyGroupRole);
            setProfileImage(data.profileImage || '');
        } catch (error: any) {
            Alert.alert('Error', 'Could not load user data')
        }
    };

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (authenticatedUser) => {
            if (authenticatedUser) {
                setCurrentUSer(authenticatedUser);
                fetchUSerData(authenticatedUser);
            } else {
                setName('User');
                setInitial('U');
                setUserRole('User');
                setCurrentUSer(null);
            }

            if (initializing) {
                setInitializing(false);
            }
        });

        return unsubscribe; 
    }, [initializing]);

    // Request Permission of Camera
    const requestCameraPermission = async (): Promise<boolean> => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA, {
                        title: 'Camera Permission',
                        message: 'App needs camera permission to take photo',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                return false;
            }
        }
        return true;
    };

    // Request Permission of Storage
    const requestStoragePermission = async (): Promise<boolean> => {
        if (Platform.OS === 'android') {
            
            const permission = Platform.Version >= 33
            ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
            : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
            try {
                const granted = await PermissionsAndroid.request ( permission,
                    {
                        title: 'Storage Permission',
                        message: 'App needs storage permission to access photos',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                return false;
            }
        }
        return true;
    };

    const handleSelectedImage = async (asset:any) => {
        try {
            if (!currentUser) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'User not authenticated',
                    visibilityTime: 3000,
                });
                return;
            }

            setProfileImage(asset.uri);

            const db = getFirestore();
            await updateDoc(doc(db, 'users', currentUser.uid), {
                profileImage: asset.uri
            });

            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Profile picture uploaded successfully',
                visibilityTime: 3000,
            });
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to upload profile picture',
                visibilityTime: 3000,
            });
        }
    };

    // Camera function
    const openCamera = async () => {
        const hasPermission = await requestCameraPermission();

        if (!hasPermission) {
            Alert.alert('Permission Denied', 'Camera permission is required to take photos');
            return;
        }

        const options: CameraOptions = {
            mediaType: 'photo' as MediaType,
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
            quality: 0.8,
        };

        launchCamera(options, (response: ImagePickerResponse) => {
            if (response.didCancel) {
                console.log('User cancelled camera picker');
                return;
            }

            if (response.errorMessage) {
                Alert.alert('Error', 'Failed to take photo');
                return; 
            }

            if (response.assets && response.assets[0]) {
                handleSelectedImage(response.assets[0]);
            }
        });
    };

    const openGallery = async () => {
        const hasPermission = await requestStoragePermission();

        if (!hasPermission) {
            Alert.alert('Permission Denied', 'Storage permission is required to access photos');
            return;
        }

        // Gallery function
        const options: CameraOptions = {
            mediaType: 'photo' as MediaType,
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
            quality: 0.8
        };

        launchImageLibrary(options, (response: ImagePickerResponse) => {
            if (response.didCancel) {
                console.log('User cancelled gallery picker');
                return;
            }

            if (response.errorMessage) {
                Alert.alert('Error', 'Failed to select photo');
                return;
            }

            if (response.assets && response.assets[0]) {
                handleSelectedImage(response.assets[0]);
            }
        });
    };

    // Functions to handle profile modal
    const openModal = () => setIsModalVisible(true);
    const closeModal = () => setIsModalVisible(false);

    // Functions to handle image selection
    const handleTakePicture = () => {
        openCamera();
        closeModal();
    };

    const handleUploadImage = () => {
        openGallery();
        closeModal();
    };

    const handleEditProfile = () => {
        navigation.navigate('EditProfile');
    };

    const handleActivityLog = () => {
        navigation.navigate('ActivityLog');
    };
    
    const handleSettings = () => {
        navigation.navigate('Settings');
    };

    const handleAbout = () => {
        navigation.navigate('About');
    };

    //Handle the logout button
    const handleLogout = async () => {
        Alert.alert(
            'Confirm Logout',
            'Are you sure you want to logout?',
            [
                {text: 'Cancel', style: 'cancel'},
                {text: 'Logout', style: 'destructive', onPress: async () => {
                    try {
                        const auth = getAuth();
                        await signOut(auth);
                    } catch (error) {
                        Toast.show({
                            type: 'error',
                            text1: 'Error',
                            text2: 'Failed to sign out. Please try again',
                            visibilityTime: 3000,
                        });
                    }
                }}
            ]
        )
    };

    //Profile options
    const profileMenu : ProfileMenuItem[] = useMemo(() => [
        { id: 1, title: "Edit Profile", iconName: "edit-3", action: handleEditProfile },
        { id: 2, title: "Activity Log", iconName: "list", action: handleActivityLog },
        { id: 3, title: "Security & Settings",iconName: "settings", action: handleSettings },
        { id: 4, title: "About",iconName: "info", action: handleAbout },
        { id: 5, title: "Logout", iconName: "log-out", action: handleLogout },
    ], [handleEditProfile, handleActivityLog, handleSettings, handleAbout, handleLogout]);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <LinearGradient
                        colors={[ '#00ACC1', '#2196F3' ]}
                        style={styles.background}
                    >
                        {/* Display Profile */}
                        <TouchableOpacity onPress={openModal}>
                            <View style={styles.profileContainer}>
                                <View style={styles.displayProfile}>
                                    {profileImage ? (
                                        <Image
                                            source={{ uri: profileImage }}
                                            style={styles.profileImage} 
                                            resizeMode='cover'
                                        />
                                    ) : (
                                        <Text style={styles.userInitial}>
                                            {initial}
                                        </Text>
                                    )}
                                </View>
                                <View style={styles.cameraContainer}>
                                    <MaterialIcons name="photo-camera" style={styles.camera}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </LinearGradient>
            
                    {/* User FullName & Role */}
                    <View style={styles.userNameContainer}>
                        <Text style={styles.userName}>
                            {name}
                        </Text>
                        <Text style={styles.userRole}>
                            {userRole}
                        </Text>
                    </View>
            
                    {/* Profile Menu Items */}
                    <View style={styles.menuContainer}>
                        { profileMenu.map((button) => (
                            <TouchableOpacity key={button.id} onPress={button.action} style={styles.buttons}>
                                <View style={styles.iconLeft}>
                                    <View style={styles.iconContainer}>
                                        <Feather name={button.iconName} style={styles.menuIcons} />
                                    </View>
                                    <Text style={styles.buttonText}>{button.title}</Text>
                                </View>
                                <Feather name="chevron-right" style={styles.chevronIcon} />
                            </TouchableOpacity>
                        )) }
                    </View>
                    <View style={styles.versionContainer}>
                        <Text style={styles.versionText}>
                            Version 1.0.0
                        </Text>
                    </View>
                </ScrollView>
                <ProfilePictureModal
                    visible={isModalVisible}
                    onClose={closeModal}
                    onTakePicture={handleTakePicture}
                    onUploadImage={handleUploadImage}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    background: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: wp(100),
        height: ms(250, .8),
        borderBottomLeftRadius: wp(5),
        borderBottomRightRadius: wp(5),
    },
    profileContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: wp(35),
        height: wp(35),
        backgroundColor: '#fff',
        borderRadius: wp(8),
    },
    displayProfile: {
        width: wp(33),
        height: wp(33),
        backgroundColor: '#cecece',
        borderRadius: wp(7.5),
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: wp(7.5)
    },
    userInitial: {
        fontSize: ms(50),
        color: '#666',
        fontWeight: '600',
    },
    cameraContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: wp(6),
        height: wp(6),
        backgroundColor: 'white',
        borderRadius: wp(5),
        transform: [
            {translateX: wp(15)},
            {translateY: wp(14)}
        ]
    },
    camera: {
        fontSize: ms(14),
        color: '#666',
    },
    userNameContainer: {
        height: ms(60, .8),
        top: ms(220, .8),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: wp(5),
        backgroundColor: '#fff',
        borderRadius: wp(3),
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    },
    userName: {
        marginBottom: hp(.5),
        color: '#1a1a1a',
        fontSize: ms(18),
        fontWeight: '600',
    },
    userRole: {
        color: '#777',
        fontSize: ms(14),
        fontWeight: '500',
    },
    menuContainer: {
        marginTop: ms(240, .8),
        marginHorizontal: hp(3),
        borderRadius: hp(2),
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(4),
        paddingVertical: hp(2),
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    iconLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: wp(10),
        height: wp(10),
        marginRight: wp(3),
        borderRadius: wp(2),
        backgroundColor: '#2196F3',
    },
    menuIcons: {
        fontSize: ms(20),
        color: '#fff',
    },
    buttonText: {
        color: '#1a1a1a',
        fontSize: ms(14),
        fontWeight: '500',
    },
    chevronIcon: {
        fontSize: ms(20),
        color: '#666',
    },
    versionContainer: {
        alignItems: 'center',
        marginTop: ms(30, .8),
        marginBottom: ms(20, .8),
    },
    versionText: {
        fontSize: ms(12),
        fontWeight: '400',
        color: '#999',
    },
});

export default Profile;