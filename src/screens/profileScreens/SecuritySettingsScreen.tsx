import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ms } from 'react-native-size-matters';
import Feather from '@react-native-vector-icons/feather';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { ProfileStackParamList } from '../../navigation/ProfileNavigation'; // Adjust path as needed

// Extend ProfileStackParamList with the new screens for settings
// NOTE: These must be defined in your navigation file!
type SettingsStackParamList = ProfileStackParamList & {
    ChangePassword: undefined;
    TwoFactorAuth: undefined;
    NotificationSettings: undefined;
    PrivacyPolicy: undefined;
    TermsOfService: undefined;
    // Add other necessary screens here
};

// Define the navigation prop type for this screen
type SettingsNavigationProp = NativeStackNavigationProp<SettingsStackParamList, 'Settings'>;

// Interface for setting menu items
interface SettingItem {
    id: number;
    title: string;
    iconName: string;
    iconType: 'Feather' | 'MaterialIcons';
    action: () => void;
    color?: string; // Optional color for specific actions like Delete
}

const Settings = () => {
    const navigation = useNavigation<SettingsNavigationProp>();

    // --- Action Handlers (Now navigating) ---

    const handleChangePassword = () => {
        // Navigate to the Change Password screen
        // You'll need to create this screen and add it to your ProfileStackParamList
        navigation.navigate('ChangePassword' as any); // Use 'as any' temporarily if you haven't updated ProfileStackParamList yet
    };

    const handleTwoFactorAuth = () => {
        // Navigate to the 2FA setup screen
        navigation.navigate('TwoFactorAuth' as any);
    };

    const handlePrivacyPolicy = () => {
        // Navigate to the Privacy Policy screen
        navigation.navigate('PrivacyPolicy' as any);
    };

    const handleTermsOfService = () => {
        // Navigate to the Terms of Service screen
        navigation.navigate('TermsOfService' as any);
    };

    const handleNotificationSettings = () => {
        // Navigate to the Notification Preferences screen
        navigation.navigate('NotificationSettings' as any);
    };

    const handleDeleteAccount = () => {
        Alert.alert(
            'Delete Account',
            'Are you sure you want to permanently delete your account? This action cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                { 
                    text: 'Delete', 
                    style: 'destructive', 
                    onPress: () => {
                        // TODO: Implement actual Firebase/backend logic for account deletion here
                        Alert.alert('Account Deletion', 'Account deletion process initiated successfully.');
                    } 
                },
            ]
        );
    };

    // --- Menu Data Structure ---

    const securitySettings: SettingItem[] = [
        { 
            id: 1, 
            title: "Change Password", 
            iconName: "lock", 
            iconType: 'Feather', 
            action: handleChangePassword 
        },
        { 
            id: 2, 
            title: "Two-Factor Authentication", 
            iconName: "shield-lock", 
            iconType: 'MaterialIcons', 
            action: handleTwoFactorAuth 
        },
    ];

    const preferenceSettings: SettingItem[] = [
        { 
            id: 3, 
            title: "Notifications", 
            iconName: "bell", 
            iconType: 'Feather', 
            action: handleNotificationSettings 
        },
    ];
    
    const legalSettings: SettingItem[] = [
        { 
            id: 4, 
            title: "Privacy Policy", 
            iconName: "file-text", 
            iconType: 'Feather', 
            action: handlePrivacyPolicy 
        },
        { 
            id: 5, 
            title: "Terms of Service", 
            iconName: "file", 
            iconType: 'Feather', 
            action: handleTermsOfService 
        },
    ];

    const accountActions: SettingItem[] = [
        { 
            id: 6, 
            title: "Delete Account", 
            iconName: "delete-forever", 
            iconType: 'MaterialIcons', 
            action: handleDeleteAccount, 
            color: '#FF3B30' // Red color for destructive action
        },
    ];

    // Helper function to render a single menu item
    const renderMenuItem = (item: SettingItem) => (
        <TouchableOpacity key={item.id} onPress={item.action} style={styles.buttons}>
            <View style={styles.iconLeft}>
                <View style={[styles.iconContainer, { backgroundColor: item.color || '#2196F3' }]}>
                    {item.iconType === 'Feather' ? (
                        <Feather name={item.iconName as any} style={styles.menuIcons} />
                    ) : (
                        <MaterialIcons name={item.iconName as any} style={styles.menuIcons} />
                    )}
                </View>
                <Text style={[styles.buttonText, { color: item.color || '#1a1a1a' }]}>
                    {item.title}
                </Text>
            </View>
            <Feather name="chevron-right" style={styles.chevronIcon} />
        </TouchableOpacity>
    );

    // Helper function to render a section
    const renderSection = (title: string, items: SettingItem[]) => (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {items.map(renderMenuItem)}
        </View>
    );

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                    
                    {renderSection("Security", securitySettings)}

                    {renderSection("Preferences", preferenceSettings)}

                    {renderSection("Legal", legalSettings)}
                    
                    <View style={{ marginTop: hp(2) }} /> 
                    {renderSection("Account Actions", accountActions)}

                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

// --- Stylesheet (remains the same as before) ---

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5', 
    },
    scrollContainer: {
        paddingVertical: hp(2),
        paddingHorizontal: wp(4),
    },
    sectionContainer: {
        backgroundColor: 'white',
        borderRadius: wp(3),
        marginBottom: hp(2),
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
        elevation: 1,
    },
    sectionTitle: {
        fontSize: ms(14),
        fontWeight: '600',
        color: '#666',
        paddingHorizontal: wp(4),
        paddingTop: hp(2),
        paddingBottom: hp(1),
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(4),
        paddingVertical: hp(1.8),
        borderBottomWidth: StyleSheet.hairlineWidth, 
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
    },
    menuIcons: {
        fontSize: ms(20),
        color: 'white',
    },
    buttonText: {
        fontSize: ms(14),
        fontWeight: '500',
        color: "#1a1a1a",
    },
    chevronIcon: {
        fontSize: ms(20),
        color: '#ccc',
    },
});

export default Settings;