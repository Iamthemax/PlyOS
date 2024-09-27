import { StyleSheet, View, Image, Text, Pressable } from "react-native"
import { widthPercentageToDP as wp } from "react-native-responsive-screen"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import CustomButton from "./CustomButton"
import { generateImageUrl } from '../services/url.service';
import { useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default NewArrivalProductCardVertical = ({ newProductItem, image, onPress, onCallPress }) => {
    const item = newProductItem
    const [imageFailed, setImageFailed] = useState(false); // State to track image failure

    return (
        <Pressable style={styles.container} onPress={onPress}>
            <Image
          source={imageFailed ? require('../../assets/img/logo_1.png') : image} // Fallback to default image
          resizeMode='contain'
          style={styles.imageStyle}
          onError={() => setImageFailed(true)} // Set imageFailed to true on error
        />
            <Text style={styles.headText} numberOfLines={1} ellipsizeMode="tail">{newProductItem.productname}</Text>
        
            <View style={styles.rowStyle}>
                <View style={{ width: '90%', padding: wp(1), flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                    <Icon size={wp(3.5)} name='map-marker' color='gray' />
                    <Text style={{fontSize:wp(3)}} numberOfLines={1} ellipsizeMode="tail">{newProductItem.cityName}</Text>
                </View>
            </View>
            <View style={styles.rowStyle}>
                <Icon size={wp(4)}
                    name={newProductItem.verifeied ? 'check-decagram' : 'alert-decagram'}
                    color={newProductItem.verifeied ? 'green' : 'red'}
                />
                <Text style={{fontSize:wp(3)}}>{newProductItem.verifeied ? ' Verified' : ' Unverified'}</Text>
            </View>
            <View style={{ marginVertical: wp(1) }}>
                <CustomButton  rightIconVector={true}  rightIconBgColor={CustomColors.accentGreen} text='Get Quote'
                    onPress={onCallPress}
                    textSize={wp(4)}
                />
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: wp(5),
        width: wp(45),
        height: wp(70),
        backgroundColor: 'white',
        elevation: 10,
        margin: wp(1),
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageStyle: {
        width: '90%',
        height: '40%',
        borderRadius: wp(5),
    },
    headText: {
        width: '90%',
        fontWeight: 'bold',
        fontSize: wp(3.5),
        marginVertical: wp(2),
        textAlign:'center'
    },
    rowStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        marginBottom: wp(1),
        width: '85%',
        justifyContent: 'center',
        overflow: "hidden"
    }
})