import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ms } from 'react-native-size-matters';
interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'text';
  disabled?: boolean;
  style?: {};
  textStyle?: {};
  activeOpacity?: number;
};

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style = {},
  textStyle = {},
  activeOpacity = 0.8,
  ...props
}) => {
  const buttonStyle = [
    styles.baseButton,
    variant === 'primary' ? styles.primaryButton :
    variant === 'secondary' ? styles.secondaryButton :
    variant === 'text' ? styles.textButton : styles.primaryButton,
    disabled && styles.disabledButton,
    style,
  ];

  const buttonTextStyle = [
    styles.baseButtonText,
    variant === 'primary' ? styles.primaryButtonText :
    variant === 'secondary' ? styles.secondaryButtonText :
    variant === 'text' ? styles.textButtonText : styles.primaryButtonText,
    disabled && styles.disabledButtonText,
    textStyle,
  ];

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
    borderRadius: hp(4),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(2),
    height: hp(6),
    },
  primaryButton: {
    backgroundColor: '#60a5fa',
    elevation: 3,
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
    borderColor: '#000000',
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
    color: '#000000',
  },
  secondaryButtonText: {
    color: '#000000',
  },
  textButtonText: {
    color: '#000000',
  },
  disabledButtonText: {
    color: '#666'
  },
});

export default Button;