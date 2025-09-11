import React, {useState, useRef} from 'react';
import { View, TextInput, StyleSheet, TextInputProps, ViewStyle, TouchableOpacity, Animated } from 'react-native';
import { ms } from 'react-native-size-matters';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Feather from "@react-native-vector-icons/feather";


interface InputProps extends TextInputProps {
    label: string;
    containerStyle?: ViewStyle;
    labelStyle?: object;
    inputStyle?: object;
    focusColor?: string;
    borderColor?: string;
    isPassword?: boolean;
};

const Input: React.FC<InputProps> = ({
    label,
    containerStyle,
    labelStyle,
    inputStyle,
    focusColor = '#60a5fa',
    borderColor = '#e1e5e9',
    isPassword,
    onFocus,
    onBlur,
    value,
    onChangeText,
    ...textInputProps
}) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>(value || '');

    // Animation for floating label
    const labelAnimation = useRef(new Animated.Value(inputValue ? 1 : 0)).current;

    const handleFocus = (e: any) => {
        setIsFocused(true);
        animateLabel(true);
        onFocus?.(e);
    };

    const handleBlur = (e: any) => {
        setIsFocused(false);
        if (!inputValue) {
            animateLabel(false);
        }
        onBlur?.(e);
    };

    const handleChangeText = (text: string) => {
        setInputValue(text);
        onChangeText?.(text);

        // Animate label based on text presence
        if (text && !isFocused) {
            animateLabel(true);
        } else if (!text && !isFocused) {
            animateLabel(false);
        }
    };

    const animateLabel = (focused: boolean) => {
        Animated.timing(labelAnimation, {
            toValue: focused ? 1 : 0,
            duration: 150,
            useNativeDriver: false,
        }).start();
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    // Default icons if none provided
    const hidePasswordIcon = <Feather name="eye" size={24} color="#666" style={styles.eyeIcon} />;
    const showPasswordIcon = <Feather name="eye-off" size={24} color="#666" style={styles.eyeIcon} />;

    const labelTop = labelAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [hp(2.6), hp(1.2)],
    });

    const labelFontSize = labelAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [ms(14), hp(1.5)],
    });

    const labelColor = labelAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['#8A8D91', isFocused ? focusColor : '#8A8D91'],
    });

    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={[
                        styles.input,
                        {borderColor: isFocused ? focusColor : borderColor},
                        isPassword && styles.passwordInput,
                        inputStyle,
                    ]}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={inputValue}
                    onChangeText={handleChangeText}
                    secureTextEntry={isPassword && !isPasswordVisible}
                    {...textInputProps}
                />

                <Animated.Text
                    style={[
                        styles.floatingLabel,
                        {
                            top: labelTop,
                            fontSize: labelFontSize,
                            color: labelColor,
                        },
                        labelStyle,
                    ]}
                >
                    {label}
                </Animated.Text>

                {isPassword && (isFocused || inputValue) &&(
                    <TouchableOpacity
                        style={styles.eyeButton}
                        onPress={togglePasswordVisibility}
                        activeOpacity={0.7}
                    >
                        {isPasswordVisible
                            ? (hidePasswordIcon)
                            : (showPasswordIcon)
                        }
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: hp(2),
    },
    inputContainer: {
        position: 'relative',
    },
    input: {
        borderWidth: 2,
        borderRadius: hp(2),
        paddingHorizontal: wp(5),
        paddingTop: hp(2),
        paddingBottom: hp(1.2),
        fontSize: ms(14),
        backgroundColor: '#f8f8f8',
        color: '#000',
        height: hp(7),
        textAlignVertical: 'bottom',
        includeFontPadding: false,
    },
    passwordInput: {
        paddingRight: hp(6.5),
    },
    floatingLabel: {
        position: 'absolute',
        left: wp(5),
        backgroundColor: 'transparent',
        fontWeight: '400',
        zIndex: 1,
        pointerEvents: 'none',
        includeFontPadding: false,
    },
    eyeButton: {
        position: 'absolute',
        right: wp(5),
        top: hp(2.2),
    },
    eyeIcon: {
        fontSize: hp(2.5),
        color: '#8A8D91',
    },
});

export default Input;