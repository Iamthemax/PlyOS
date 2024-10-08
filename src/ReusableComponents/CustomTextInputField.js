import React from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import CustomColors from '../styles/CustomColors.js';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const CustomTextInputField = ({ 
  imagePath,
  inputType = 'text',
  placeholder = '',
  validator,
  editable,
  customWidth='100%',
  onPress,
  onIconPress,
    ...rest
}) => {
  const handleOnChangeText = (text) => {
    if (validator) {
      validator(text); 
    }
  };

  return (
      <View style={[styles.container,{width:customWidth,rest,height: wp(11)}]}>
      {imagePath && (
        <View style={styles.iconContainer}>
          <Image source={imagePath} style={styles.imageStyle} onPress={onIconPress}/>
        </View>
      )}
      <TextInput
      selectionColor={CustomColors.mattBrownDark}
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={inputType === 'password'}
        editable={editable}
        keyboardType={
          inputType === 'number' ? 'numeric' : inputType === 'email'
            ? 'email-address'
            : 'default'
        }
        onChangeText={handleOnChangeText}
        onPress={onPress}
        {...rest}
        autoCapitalize="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    shadowColor: CustomColors.shadowColorGray,
    shadowRadius: 50,
    elevation: 5,
    borderWidth: 0.6,
    borderColor: CustomColors.searchBackground,
    borderColor:CustomColors.searchBgColor,
    borderRadius:50,
  },
  iconContainer: {
    height: wp(13), 
    width: wp(13), 
    borderRadius: 50,
    margin:1,
    backgroundColor: CustomColors.mattBrownDark,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center'
  },
  input: {
    flex:1,
    fontSize: wp(4),
    color: '#000000',
    paddingStart: wp(2),
  },
  imageStyle: {
    height: wp(7),
    width: wp(7),
    borderRadius: 25,
    backgroundColor: CustomColors.mattBrownDark,
  }
});

export default CustomTextInputField;