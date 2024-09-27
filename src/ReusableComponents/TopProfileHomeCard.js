import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Image } from 'react-native-elements';
import { Text } from 'react-native-paper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Rating } from 'react-native-ratings';
import CustomColors from '../styles/CustomColors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TopProfileHomeCard = ({ title, image, rating, Product, onPress, onCallPress, item }) => {
  const [imageFailed, setImageFailed] = useState(false); // State to track image failure

  return (
    <View style={styles1.card1}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', left: wp(13) }}>
        <View style={{ overflow: 'hidden', width: wp(60) }}>
          <Text style={styles1.cardTitle1} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
          <View style={{ alignItems: 'flex-start', flexDirection: 'row', marginTop: wp(1) }}>
            <Rating imageSize={wp(4)} readonly startingValue={rating} />
            <Text style={styles1.productText}>Products {Product}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: wp(3), alignItems: 'flex-start' }}>
            <TouchableOpacity style={styles1.callwrap} onPress={onCallPress}>
              <View style={styles1.iconwrap}>
              <Ionicons  name="call" size={wp(6)} color="#FFFFFF" />

</View>
              <View style={{ paddingLeft: wp(1), paddingRight: wp(3) }}>
                <Text style={{ fontWeight: '900' ,fontSize:wp(3.5)}}>Connect</Text>
              </View>
            </TouchableOpacity>
            <View style={styles1.callwrap1}>
              <TouchableOpacity onPress={onPress}>
                <Text style={styles1.profileButtonText}>Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          shadowOpacity: 1,
          width: wp(25),
          left: -wp(14),
          alignSelf: 'center',
          justifyContent:'center',
          borderRadius: wp(12.5),
          elevation: wp(3),
        }}
      >
        <Image
          source={imageFailed ? require('../../assets/img/logo_1.png') : image} // Fallback to default image
          resizeMode='contain'
          style={styles1.cardImage1}
          onError={() => setImageFailed(true)} // Set imageFailed to true on error
        />
      </View>
    </View>
  );
};

const styles1 = StyleSheet.create({
  card1: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    margin: wp(5),
    paddingVertical: wp(1.5),
    width: wp(68),
    marginLeft: wp(14),
  },
  cardImage1: {
    width: wp(25),
    height: wp(25),
    borderRadius: wp(25),
    borderWidth: wp(0.25),
    borderColor: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  cardTitle1: {
    fontSize: wp(4),
    fontWeight: 'bold',
    marginVertical: 5,
    overflow: 'hidden',
    flexShrink: 1, // Ensures text will shrink to fit the width
    width: wp(50), // Limit the width of the title container to prevent overflow
  },
  productText: {
    fontWeight: '900',
    fontSize: wp(2.5),
    marginLeft: wp(1.5),
  },
  callwrap: {
    backgroundColor: '#F5E5D8',
    borderRadius: wp(9),
    alignItems: 'center',
    marginHorizontal: wp(1.2),
    flexDirection: 'row',
    paddingVertical: wp(1.2),
  },
  callwrap1: {
    backgroundColor: CustomColors.colorNewButton,
    borderRadius: wp(9),
    alignItems: 'center',
    marginHorizontal: wp(1.2),
    flexDirection: 'row',
    paddingVertical: wp(1.2),
    alignSelf:'center'
  },
  iconwrap: {
    height: wp(8),
    width: wp(8),
    borderRadius: wp(9),
    backgroundColor: '#39AB68',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileButtonText: {
    fontWeight: '900',
    color: 'white',
    paddingLeft: wp(4),
    paddingRight: wp(4),
    paddingVertical: wp(1),
    fontSize:wp(3.5)
  },
});

export default TopProfileHomeCard;
