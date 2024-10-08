import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {Image, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomColors from '../../styles/CustomColors';

export default function Header(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.rowStyle}>
      {props.normal && (
        <Image style={styles.logoStyle} source={require('../../../assets/img/logonew.png')}/>
      )}

      {props.stackHeader && (
        <Text style={styles.categry}>{props.screenName}</Text>
      )}

      {props.backbtnshowpage && (
        <Text style={styles.categry}>Product Name</Text>
      )}

      <MaterialCommunityIcons onPress={()=>navigation.goBack()} style={styles.iconStyle} name='arrow-left' color={CustomColors.mattBrownDark} size={wp(8)}/>
    </View>
  );
}
const styles = StyleSheet.create({
  rowStyle:{
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: '2%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: '10%',
  },
  iconStyle:{
    position: 'absolute',
    margin: wp(1),
    left: 0,
  },
  logoStyle: {
    width: '100%',
    height: wp(13.5),
    resizeMode:"contain"
  },
  categry: {
    fontSize: wp(6),
    color: '#000',
    fontFamily: 'Manrope-Medium',
  },
});
