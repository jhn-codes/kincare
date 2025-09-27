import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ms } from 'react-native-size-matters';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'text';
  disabled?: boolean;
  style?: {};
  textStyle?: {};
  disabledTextStyle?: {};
  activeOpacity?: number;
};

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style = {},
  textStyle = {},
  disabledTextStyle = {},
  activeOpacity = 0.8,
  ...props
}) => {
  const buttonStyle = [
    styles.baseButton,
    variant === 'secondary' ? styles.secondaryButton :
    variant === 'text' ? styles.textButton : null,
    disabled && styles.disabledButton,
    style,
  ];

  const buttonTextStyle = [
    styles.baseButtonText,
    variant === 'primary' ? styles.primaryButtonText :
    variant === 'secondary' ? styles.secondaryButtonText :
    variant === 'text' ? styles.textButtonText : styles.primaryButtonText,
    disabled && [styles.disabledButtonText, disabledTextStyle],
    textStyle,
  ];

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        key={variant}
        onPress={onPress}
        activeOpacity={disabled ? 1 : activeOpacity}
        disabled={disabled}
        style={[styles.primaryGradientWrapper, style]}
        {...props}
      >
        <LinearGradient
          colors={['#00ACC1', '#2196F3']}
          style={[styles.baseButton, styles.primaryGradient]}
        >
          <Text style={buttonTextStyle}>
            {title}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity
      key={variant}
      style={buttonStyle}
      onPress={onPress}
      activeOpacity={disabled ? 1 : activeOpacity}
      disabled={disabled}
      {...props}
    >
      <Text style={buttonTextStyle}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(5),
    borderRadius: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(2),
    height: hp(6),
    },
  primaryGradientWrapper: {
    elevation: 3,
  },
  primaryGradient: {
    elevation: 0,
    width: '100%',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderColor: '#60a5fa',
    borderWidth: 1,
    elevation: 1,
  },
  textButton: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    height: 'auto',
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(0.5),
    marginBottom: hp(1),
  },
  disabledButton: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  baseButtonText: {
    fontSize: ms(14),
    textAlign: 'center',
    fontFamily: 'sans-serif-medium',
  },
  primaryButtonText: {
    color: '#fff',
  },
  secondaryButtonText: {
    color: '#60a5fa',
  },
  textButtonText: {
    color: '#60a5fa',
  },
  disabledButtonText: {
    color: '#666'
  },
});

export default Button;