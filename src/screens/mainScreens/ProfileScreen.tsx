import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ms } from "react-native-size-matters";
import Feather from "@react-native-vector-icons/feather";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import { useState } from "react";
import ProfilePictureModal from "../../components/UI/ProfileModal";

const Profile = () => {
    // State to control modal visibility
    const [isModalVisible, setIsModalVisible] = useState(false);

    const profileMenu = [
        { id: 1, title: "Edit Profile", iconName: "edit-3", action: () => console.log('Hello') },
        { id: 2, title: "Activity Log", iconName: "list", action: () => console.log('Ngek') },
        { id: 3, title: "Security & Settings", iconName: "settings", action: () => console.log('Hi') },
        { id: 4, title: "About", iconName: "info", action: () => console.log('hello') },
        { id: 5, title: "Logout", iconName: "log-out", action: () => console.log('hi') },
    ];

    // Functions to handle modal
    const openModal = () => setIsModalVisible(true);
    const closeModal = () => setIsModalVisible(false);

    // Functions to handle image selection
    const handleTakePicture = () => {
        console.log('Take a picture selected');
        // Add your camera logic here
        closeModal();
    };

    const handleUploadImage = () => {
        console.log('Upload an image selected');
        // Add your image picker logic here
        closeModal();
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollContainer}
                >
                    <LinearGradient
                        colors={[ '#00ACC1', '#2196F3']}
                        style={styles.background}
                    >
                        {/* Upload Profile - Now clickable */}
                        <TouchableOpacity onPress={openModal}>
                            <View style={styles.profileContainer}>
                                <View style={styles.displayProfile} />
                                <Text style={styles.userInitial}>
                                    KM
                                </Text>
                                <View style={styles.cameraContainer}>
                                    <MaterialIcons name="photo-camera" style={styles.camera}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </LinearGradient>
                    
                    {/* User Info */}
                    <View style={styles.userNameContainer}>
                        <Text style={styles.userName}>
                            Kristal May Musni
                        </Text>
                        <Text style={styles.userRole}>
                            HouseHold Head
                        </Text>
                    </View>
          
                    {/* Menu Items */} 
                    <View style={styles.menuContainer}>
                        { profileMenu.map((button) => (
                            <TouchableOpacity key={button.id} onPress={button.action} style={styles.buttons}>
                                <View style={styles.iconLeft}>
                                    <View style={styles.iconContainer}>
                                        <Feather name={button.iconName as any} style={styles.menuIcons} />
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

                {/* Profile Picture Modal - Now using separate component */}
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
        backgroundColor: '#00ACC1',
    },
    scrollContainer: {
        backgroundColor: '#f8f8f8',
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
        backgroundColor: 'white',
        borderRadius: wp(8),
    },
    displayProfile: {
        width: wp(33),
        height: wp(33),
        backgroundColor: '#cecece',
        borderRadius: wp(7.5),
    },
    userInitial: {
        position: 'absolute',
        fontSize: ms(32)
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
        top: ms(220, .8),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: ms(200),
        height: ms(60, .8),
        backgroundColor: 'white',
        borderRadius: wp(3),
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    },
    userName: {
        marginBottom: hp(.5),
        fontSize: ms(18),
        fontWeight: '600',
    },
    userRole: {
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
        color: 'white',
    },
    buttonText: {
        fontSize: ms(14),
        fontWeight: '500',
        color: "#333",
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