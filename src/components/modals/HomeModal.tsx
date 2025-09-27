import { useEffect, useRef, useState } from "react";
import { Animated, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { ms } from "react-native-size-matters";
import MaterialIcons from "@react-native-vector-icons/material-icons";

interface HomeModalProps {
    visible: boolean;
    onClose: () => void;
}

const HomeModal: React.FC<HomeModalProps> = ({ visible, onClose }) => {
    const slideAnim = useRef(new Animated.Value(-wp(80))).current;
    const opcityAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const iconRotateAnim = useRef(new Animated.Value(0)).current;
    const cardScaleAnim = useRef(new Animated.Value(50)).current;
    const [shouldRender, setShouldRender] = useState<boolean>(false);

    useEffect (() => {
        if (visible) {
            setShouldRender(true);

            slideAnim.setValue(-wp(80));
            opcityAnim.setValue(0);
            scaleAnim.setValue(0.8);
            iconRotateAnim.setValue(0);
            cardScaleAnim.setValue(50);

            Animated.parallel([
                Animated.spring(slideAnim, {
                    toValue: 0,
                    tension: 80,
                    friction: 8,
                    useNativeDriver: true,
                }),
                Animated.timing(opcityAnim, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }),
            ]).start();

            setTimeout(() => {
                Animated.parallel([
                    Animated.spring(scaleAnim, {
                        toValue: 1,
                        tension: 100,
                        friction: 8,
                        useNativeDriver: true,
                    }),
                    Animated.spring(cardScaleAnim, {
                        toValue: 0,
                        tension: 80,
                        friction: 8,
                        useNativeDriver: true,
                    }),
                    Animated.timing(iconRotateAnim, {
                        toValue: 1,
                        duration: 600,
                        useNativeDriver: true,
                    }),
                ]).start();
            }, 150);

        } else if (shouldRender) {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: -wp(80),
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(opcityAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 0.8,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                setShouldRender(false);
                slideAnim.setValue(-wp(80));
                opcityAnim.setValue(0);
                scaleAnim.setValue(0.8);
                iconRotateAnim.setValue(0);
                cardScaleAnim.setValue(50);
            });
        }
    }, [visible, shouldRender, slideAnim, opcityAnim, scaleAnim, iconRotateAnim, cardScaleAnim]);

    if (!shouldRender) return null;

    const iconRotate =iconRotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return(
        <View style={styles.overlay}>
            <StatusBar backgroundColor='rgba(0, 0, 0, 0.6)' translucent />

            <TouchableWithoutFeedback onPress={onClose}>
                <Animated.View style={[styles.backdrop, { opacity: opcityAnim }]} />
            </TouchableWithoutFeedback>

            <Animated.View style={[styles.modalContainer, {
                transform: [{ translateX: slideAnim }],
            }]}>   
                <LinearGradient
                    colors={['#00ACC1', '#2196F3']}
                    style={styles.modalGradient}
                >
                    <SafeAreaView style={styles.container}>

                        {/* Header Section */}
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <MaterialIcons name="close" size={ms(18)} />
                        </TouchableOpacity>

                        <Animated.View style={[styles.choiceContainer,
                            { transform: [{ scale: scaleAnim }, { translateY: cardScaleAnim }]}
                        ]}>
                            <View style={styles.cardContent}>
                                <View style={styles.iconContainer}>
                                    <LinearGradient
                                        colors={['#FF6B6B', '#FF8E8E']}
                                        style={styles.iconGradient}
                                    >
                                        <Animated.View style={{transform: [{rotate: iconRotate}]}}>
                                            <MaterialIcons
                                                name="group-add"
                                                size={ms(32)}
                                                color='#fff'
                                            />
                                        </Animated.View>
                                    </LinearGradient>
                                    <View style={styles.iconGlow} />
                                </View>

                                <View style={styles.textSection}>
                                    <Text style={styles.titleText}>
                                        Create Family Group
                                    </Text>
                                    <Text style={styles.bodyText}>
                                        Start a new group and invite family members to begin your journey together
                                    </Text>
                                </View>

                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={styles.button}>
                                        <Text style={styles.buttonText}>
                                            Create Family Group
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Animated.View>

                        <Animated.View style={[styles.choiceContainer,
                            { transform: [{ scale: scaleAnim }, { translateY: cardScaleAnim }]}
                        ]}>
                            <View style={styles.cardContent}>
                                <View style={styles.iconContainer}>
                                    <LinearGradient
                                        colors={['#FF6B6B', '#FF8E8E']}
                                        style={styles.iconGradient}
                                    >
                                        <Animated.View style={{transform: [{rotate: iconRotate}]}}>
                                            <MaterialIcons
                                                name="diversity-1"
                                                size={ms(32)}
                                                color='#fff'
                                            />
                                        </Animated.View>
                                    </LinearGradient>
                                    <View style={styles.iconGlow} />
                                </View>

                                <View style={styles.textSection}>
                                    <Text style={styles.titleText}>
                                        Join Family Group
                                    </Text>
                                    <Text style={styles.bodyText}>
                                        Join in an existing group to stay connected with family members
                                    </Text>
                                </View>

                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={styles.button}>
                                        <Text style={styles.buttonText}>
                                            Join Family Group
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Animated.View>

                    </SafeAreaView>
                </LinearGradient>
            </Animated.View>
        </View>
        
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: wp(80),
        height: hp(100),
        zIndex: 1,
    },
    modalGradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: wp(4),
        gap: hp(2),
    },
    closeButton: {
        alignSelf: 'flex-end',
        padding: wp(2),
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: hp(10),
        marginTop: hp(2),
        marginBottom: hp(3),
    },
    choiceContainer: {
        backgroundColor: '#fff',
        borderRadius: hp(2),
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 8},
        shadowOpacity: 0.15,
        shadowRadius: hp(2),
        elevation: 10,
        overflow: 'hidden',
    },
    cardContent: {
        padding: wp(6),
    },
    iconContainer: {
        position: 'relative',
        alignItems: 'center',
        marginBottom: hp(2),
    },
    iconGradient: {
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 35,
        shadowColor: '#FF6B6B',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    iconGlow: {
        width: 90,
        height: 90,
        position: 'absolute',
        borderRadius: 45,
        backgroundColor: '#FF6B6B',
        opacity: 0.1,
        top: -10,
    },
    textSection: {
        alignItems: 'center',
        marginBottom: hp(3),
    },
    titleText: {
        marginBottom: hp(1),
        fontSize: ms(16),
        fontWeight: '600',
        color: '#1a1a1a',
    },
    bodyText: {
        textAlign: 'center',
        fontSize: ms(14),
        fontWeight: '500',
        color: '#777',
    },
    buttonContainer: {
        alignSelf: 'center',
        borderWidth: ms(1),
        borderRadius: hp(1.5),
        borderColor: '#FF6B6B',
        width: wp(50),
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: hp(1),
        gap: 5,
    },
    buttonText: {
        color: '#FF6B6B',
        fontSize: ms(14),
        fontWeight: '500',
    },
});

export default HomeModal;