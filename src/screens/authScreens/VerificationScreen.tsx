import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { deleteUser, getAuth, reload, sendEmailVerification, signOut } from '@react-native-firebase/auth';
import { deleteDoc, doc, getFirestore } from '@react-native-firebase/firestore';
import Feather from '@react-native-vector-icons/feather';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ms } from 'react-native-size-matters';
import Toast from 'react-native-toast-message';
import Button from '../../components/UI/Button';
import { SafeAreaView } from 'react-native-safe-area-context';

interface VerificationScreenProps {
    onVerificationStatusChange?: (isVerified: boolean) => void;
}

const VerificationScreen: React.FC<VerificationScreenProps> = ({ onVerificationStatusChange }) => {
    const [isResending, setIsResending] = useState(false);

    const auth = getAuth();
    const user = auth.currentUser;

    const checkVerificationStatus = async () => {
        if (!user) return false;

        try {
            await reload(user);
            const refreshedUser = auth.currentUser;
            const isVerified = refreshedUser?.emailVerified || false;

            if (onVerificationStatusChange) {
                onVerificationStatusChange(isVerified);
            }

            return isVerified;
        } catch (error) {
            return false;
        }
    };

    useEffect(() => {
        const interval = setInterval(async () => {
            if (user && !user.emailVerified) {
                await checkVerificationStatus();
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [user]);

    const handleResendVerification = async () => {
        if (!user) return;

        setIsResending(true);
        try {
            await sendEmailVerification(user);
            Toast.show({
                type: 'success',
                text1: 'Email Sent',
                text2: 'Verification email has been sent to your email address.',
                visibilityTime: 3000,
            })
        } catch (error: any) {
            Alert.alert('Error', error.message);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message,
                visibilityTime: 3000,
            });
        } finally {
            setIsResending(false);
        }
    };

    const handleCancel = async () => {
        Alert.alert(
            'Cancel Verification',
            'Are you sure you want to cancel the verification? This will delete your account.',
            [
                {text: 'No', style: 'cancel'},
                {text: 'Yes', style: 'destructive', onPress: async () => {
                    try {
                        const db = getFirestore();

                        if (user) {
                            await deleteDoc(doc(db, 'users', user.uid));
                            await deleteUser(user);
                            Toast.show({
                                type: 'info',
                                text1: 'Account Verification Cancelled',
                                text2: 'Your account has been deleted',
                                visibilityTime: 3000,
                            });
                        }
                    } catch (error: any) {
                        try {
                            await signOut(auth);
                            Toast.show({
                                type: 'info',
                                text1: 'Signed Out',
                                text2: 'You have been signed out',
                                visibilityTime: 3000,
                            });
                        } catch (signOutError: any) {
                            Toast.show({
                                type: 'error',
                                text1: 'Error',
                                text2: 'Unable to cancel account creation',
                                visibilityTime: 3000,
                            })
                        }
                    }
                }}
            ]
        )
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView 
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.content}>
                    <View style={styles.iconContainer}>
                        <Feather name="mail" size={ms(30)} color="#007AFF" />
                    </View>
                    <Text style={styles.title}>Verify Your Email</Text>
                    <Text style={styles.description}>
                        We've sent a verification email to:
                    </Text>
                    <Text style={styles.email}>{user?.email}</Text>
            
                    <View style={styles.instructionContainer}>
                        <View style={[styles.card, styles.primaryCard]}>
                            <Feather name="check-circle" size={ms(20)} color="#10b981" style={styles.cardIcon} />
                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitle}>Check your inbox</Text>
                                <Text style={styles.cardDescription}>
                                    Click the verification link in the email from KinCare
                                </Text>
                            </View>
                        </View>
                        <View style={[styles.card, styles.warningCard]}>
                            <Feather name="alert-triangle" size={ms(20)} color="#f59e0b" style={styles.cardIcon} />
                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitle}>Check your spam folder</Text>
                                <Text style={styles.cardDescription}>
                                    Sometimes our emails end up in the spam or junk folder
                                </Text>
                            </View>
                        </View>
                        <View style={[styles.card, styles.infoCard]}>
                            <Feather name="info" size={ms(20)} color="#6366f1" style={styles.cardIcon}/>
                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitle}>Still can't find it?</Text>
                                <Text style={styles.cardDescription}>
                                    • Try resending email again
                                </Text>
                            </View>
                        </View>
                    </View>
            
                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={handleResendVerification}
                        disabled={isResending}
                    >
                        {isResending ? (
                            <ActivityIndicator color="#007AFF" />
                        ) : (
                            <Text style={styles.primaryButtonText}>Resend Email</Text>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={handleCancel}
                    >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        paddingHorizontal: wp(10),
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        backgroundColor: '#d1e9ff',
        borderRadius: hp(2),
        padding: hp(2),
        marginBottom: hp(2),
    },
    title: {
        marginBottom: hp(2),
        color: '#1a1a1a',
        fontSize: ms(26),
        fontWeight: 'bold',
    },
    description: {
        fontSize: ms(14),
        marginBottom: hp(1),
        textAlign: 'center',
        color: '#666',
    },
    email: {
        marginBottom: hp(2),
        fontSize: ms(14),
        fontWeight: '600',
        color: '#007AFF',
    },
    instructionContainer: {
        marginBottom: hp(3),
    },
    card: {
        flexDirection: 'row',
        marginBottom: hp(2),
        borderRadius: hp(2),
        padding: wp(4),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: hp(2),
        elevation: 3,
    },
    primaryCard: {
        borderLeftWidth: ms(4),
        borderLeftColor: '#10b981',
        backgroundColor: '#d9fcf0',
    },
    warningCard: {
        borderLeftWidth: ms(4),
        borderLeftColor: '#f59e0b',
        backgroundColor: '#faefdd',
    },
    infoCard: {
        borderLeftWidth: ms(4),
        borderLeftColor: '#1E90FF',
        backgroundColor: '#d5e8fd',
    },
    cardIcon: {
        marginRight: ms(12),
    },
    cardContent: {
        flex: -1,
    },
    cardTitle: {
        color: '#1a1a1a',
        fontSize: ms(16),
        fontWeight: '600',
        marginBottom: hp(1),
    },
    cardDescription: {
        color: '#64748b',
        fontSize: ms(14),
        lineHeight: ms(20),
    },
    primaryButton: {
        backgroundColor: 'transparent',
        paddingVertical: hp(1.5),
        borderRadius: hp(1.5),
        borderWidth: ms(1),
        borderColor: '#007AFF',
        width: '100%',
        marginBottom: hp(1.5),
        alignItems: 'center',
    },
    primaryButtonText: {
        color: '#007AFF',
        fontSize: ms(14),
        fontWeight: '600',
    },
    cancelButton: {
        paddingVertical: hp(1.5),
    },
    cancelButtonText: {
        color: '#dc3545',
        fontSize: ms(14),
        fontWeight: '500',
    },
});

export default VerificationScreen;