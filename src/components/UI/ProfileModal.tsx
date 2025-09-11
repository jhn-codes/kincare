import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ms } from 'react-native-size-matters';
import MaterialIcons from '@react-native-vector-icons/material-icons';

interface ProfilePictureModalProps {
    visible: boolean;
    onClose: () => void;
    onTakePicture: () => void;
    onUploadImage: () => void;
}

const ProfilePictureModal: React.FC<ProfilePictureModalProps> = ({ 
    visible, 
    onClose, 
    onTakePicture, 
    onUploadImage 
}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableOpacity 
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={onClose}
            >
                <TouchableOpacity 
                    style={styles.modalContent}
                    activeOpacity={1}
                    onPress={() => {}} // Prevent closing when tapping inside modal
                >
                    <LinearGradient
                        colors={['#00ACC1', '#2196F3']}
                        style={styles.modalGradient}
                    >
                        <View style={styles.design} />
                        <Text style={styles.modalTitle}>
                            How would you like to upload{'\n'}your profile picture?
                        </Text>
                        
                        <TouchableOpacity 
                            style={styles.modalButton}
                            onPress={onTakePicture}
                        >
                            <View style={styles.buttonIconContainer}>
                                <MaterialIcons name="photo-camera" style={styles.modalButtonIcon} />
                            </View>
                            <Text style={styles.modalButtonText}>Take a picture</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.modalButton}
                            onPress={onUploadImage}
                        >
                            <View style={styles.buttonIconContainer}>
                                <MaterialIcons name="photo-library" style={styles.modalButtonIcon} />
                            </View>
                            <Text style={styles.modalButtonText}>Upload an image</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        borderTopLeftRadius: wp(6),
        borderTopRightRadius: wp(6),
        overflow: 'hidden',
    },
    modalGradient: {
        paddingHorizontal: wp(8),
        paddingTop: hp(2),
        paddingBottom: hp(3),
        alignItems: 'center',
    },
    design: {
        width: wp(8),
        height: hp(.6),
        marginBottom: hp(2),
        borderRadius: wp(8),
        backgroundColor: 'white',
    },
    modalTitle: {
        fontSize: ms(16),
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: hp(3),
        lineHeight: ms(24),
    },
    modalButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        paddingVertical: hp(.8),
        paddingHorizontal: wp(6),
        marginBottom: hp(2),
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: wp(3),
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    buttonIconContainer: {
        width: wp(10),
        height: wp(10),
        borderRadius: wp(2),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp(2),
    },
    modalButtonIcon: {
        fontSize: ms(20),
    },
    modalButtonText: {
        fontSize: ms(14),
        fontWeight: '500',
        flex: 1,
    },
});

export default ProfilePictureModal;