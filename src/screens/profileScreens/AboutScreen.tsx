import React from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ms } from 'react-native-size-matters';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../navigation/ProfileNavigation'; // Adjust path as needed

// Define the navigation prop type for this screen
type AboutNavigationProp = NativeStackNavigationProp<ProfileStackParamList, 'About'>;

const About = () => {
    const navigation = useNavigation<AboutNavigationProp>();

    // This data would be specific to your app
    const appInfo = {
        name: 'My Household App', // Replace with your app's actual name
        version: '1.0.0',
        description: "This application is dedicated to simplifying household management and fostering community engagement. Our goal is to empower users with tools for activity logging, resource sharing, and secure profile management.",
        features: [
            "User Profile & Customization",
            "Real-time Activity Logging",
            "Secure Authentication (via Firebase)",
            "Responsive & User-Friendly Interface",
            "Direct Navigation to App Settings",
        ],
        technologies: [
            "React Native",
            "@react-native-firebase/auth & firestore",
            "react-native-image-picker",
            "react-native-responsive-screen",
            "react-native-size-matters",
        ]
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

                    {/* App Logo/Icon Placeholder */}
                    <View style={styles.iconContainer}>
                        <MaterialIcons name="home-work" style={styles.appIcon} />
                    </View>

                    {/* App Name and Version */}
                    <Text style={styles.appName}>{appInfo.name}</Text>
                    <Text style={styles.appVersion}>Version {appInfo.version}</Text>

                    {/* App Description */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Our Mission</Text>
                        <Text style={styles.descriptionText}>{appInfo.description}</Text>
                    </View>

                    {/* Key Features */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Key Features</Text>
                        {appInfo.features.map((feature, index) => (
                            <View key={index} style={styles.listItem}>
                                <Text style={styles.bulletPoint}>•</Text>
                                <Text style={styles.listItemText}>{feature}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Technologies */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Built With</Text>
                        <Text style={styles.listItemText}>This app relies on the following core technologies:</Text>
                        {appInfo.technologies.map((tech, index) => (
                            <View key={index} style={styles.listItem}>
                                <Text style={styles.bulletPoint}>•</Text>
                                <Text style={styles.listItemText}>{tech}</Text>
                            </View>
                        ))}
                    </View>
                    
                    {/* Placeholder for Copyright/Contact */}
                    <Text style={styles.footerText}>© {new Date().getFullYear()} Your Company/Developer Name</Text>

                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        paddingVertical: hp(3),
        paddingHorizontal: wp(5),
        alignItems: 'center',
    },
    iconContainer: {
        marginBottom: hp(2),
        width: wp(25),
        height: wp(25),
        borderRadius: wp(5),
        backgroundColor: '#E3F2FD', // Light Blue Background
        justifyContent: 'center',
        alignItems: 'center',
    },
    appIcon: {
        fontSize: ms(50),
        color: '#2196F3', // Primary App Color
    },
    appName: {
        fontSize: ms(24),
        fontWeight: '700',
        color: '#1a1a1a',
        textAlign: 'center',
    },
    appVersion: {
        fontSize: ms(14),
        color: '#666',
        marginBottom: hp(3),
    },
    section: {
        width: '100%',
        marginBottom: hp(3),
        paddingHorizontal: wp(2),
    },
    sectionTitle: {
        fontSize: ms(18),
        fontWeight: '600',
        color: '#2196F3', // Accent color
        marginBottom: hp(1.5),
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        paddingBottom: hp(0.5),
    },
    descriptionText: {
        fontSize: ms(14),
        color: '#444',
        lineHeight: ms(20),
        textAlign: 'justify',
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: hp(0.5),
    },
    bulletPoint: {
        fontSize: ms(14),
        color: '#2196F3',
        marginRight: wp(2),
        marginTop: Platform.OS === 'ios' ? 0 : -ms(2), // Minor adjustment for Android alignment
    },
    listItemText: {
        flex: 1,
        fontSize: ms(14),
        color: '#444',
    },
    footerText: {
        marginTop: hp(2),
        fontSize: ms(12),
        color: '#999',
    },
});

export default About;