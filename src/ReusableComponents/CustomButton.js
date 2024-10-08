import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CustomColors from '../styles/CustomColors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomButton = ({
  text,
  rightIcon = false,
  leftIconPath = null,
  buttonBgColor = CustomColors.colorNewButton,
  rightIconBgColor = CustomColors.accentGreen,
  leftIconBgColor = CustomColors.accentGreen,
  onPress,
  textSize = 16,
  fontWeight = 'bold',
  paddingHorizontal = wp(2),
  paddingVertical = wp(2),
  hasBorder = false,
  rightIconVector,
  ...rest
}) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: buttonBgColor }, hasBorder && { borderWidth: 2, borderColor: '#bc9b80' }, rest]} onPress={onPress}>
        <View style={styles.container}>
        {leftIconPath && (
          <View style={[styles.iconContainer, { backgroundColor: leftIconBgColor }]}>
            <Image source={leftIconPath} style={styles.leftIcon} size={50} />
          </View>
        )}
        <Text style={[styles.text, { fontSize: textSize, fontWeight: fontWeight, paddingHorizontal: paddingHorizontal, paddingVertical: paddingVertical }]}>{text}</Text>
        {rightIcon && (
          <View style={[styles.iconContainer, { backgroundColor: rightIconBgColor }]}>
            <Image source={rightIcon} style={styles.leftIcon} size={50} />
          </View>
        )}
        {rightIconVector && (
          <View style={[styles.iconContainer, { backgroundColor: rightIconBgColor }]}>
        <Ionicons  name="call" size={wp(6)} color="#FFFFFF" />
        </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    elevation: 5,
    alignSelf: 'flex-start', // This will make the button wrap its content
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: wp(5),
    paddingVertical: wp(1),
  },
  iconContainer: {
    width: 35,
    height: 35,
    borderRadius: 50,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
});

export default CustomButton;