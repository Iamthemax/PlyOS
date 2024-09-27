import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "react-native-elements";
import { Text } from "react-native-paper";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { generateImageUrl } from "../services/url.service";

const StateItem = ({ item, onPress }) => {
    const [imageFailed, setImageFailed] = useState(false);
    
    return (
        <TouchableOpacity style={stateStyle.container} onPress={onPress}>
            <Image
                style={stateStyle.image}
                source={imageFailed ? require('../../assets/img/globe.png') : { uri: generateImageUrl(item?.image) }}
                onError={() => setImageFailed(true)}
            />
            <Text style={stateStyle.title} numberOfLines={2} ellipsizeMode="tail">
                {item.stateId.name}
            </Text>
        </TouchableOpacity>
    );
}

const stateStyle = StyleSheet.create({
    container: {
        marginHorizontal: widthPercentageToDP(1),
        marginVertical: widthPercentageToDP(3),
        alignItems: 'center', // Align children (image and text) to the center
        justifyContent: 'center', // Vertically center the content
    },
    image: {
        width: widthPercentageToDP(20),
        height: widthPercentageToDP(20),
        borderRadius: widthPercentageToDP(15),
    },
    title: {
        paddingVertical: widthPercentageToDP(2),
        textAlign: 'center', // Center the text itself
    },
});

export default StateItem;
