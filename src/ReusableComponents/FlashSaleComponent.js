import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, Dimensions, Easing, Pressable, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const FlashSaleComponent = () => {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start the rotation animation
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 4000, // 4 seconds for a full rotation
        useNativeDriver: true,
        easing: Easing.linear, // Use linear easing for smooth rotation
      })
    ).start();
  }, [rotation]);

  // Interpolate rotation to degrees
  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const numberOfLines = 36; // Number of lines to draw

  return (
    <View style={styles.container}>
      {/* Rotating lines */}
      <Animated.View style={[styles.linesContainer, { transform: [{ rotate: rotateInterpolate }] }]}>
        {Array.from({ length: numberOfLines }).map((_, index) => {
          const angle = (360 / numberOfLines) * index; // Calculate the angle for each line
          return (
            <View
              key={index}
              style={[
                styles.line,
                {
                  transform: [
                    { rotate: `${angle}deg` }, // Rotate each line based on its position in the circle
                    { translateY: -50 }, // Move the line outward from the center
                  ],
                },
              ]}
            />
          );
        })}
      </Animated.View>

      {/* Static Flash Sale Text */}
      <TouchableOpacity onPress={()=>{}}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Flash</Text>
        <Text style={styles.text}>Sale</Text>
      </View>
      </TouchableOpacity>
    </View>
  );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(35),
    height: wp(58),
    borderRadius: 10,
    backgroundColor: 'red',
    overflow: 'hidden',
  },
  linesContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius:300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    position: 'absolute',
    width: 2,
    height: '100%',
    backgroundColor: 'rgba(255,255,250,0.5)',
  },
  textContainer: {
    backgroundColor: 'rgba(255, 0, 0, 0.5)', // Red background with 50% opacity

    height: wp(30),
    width:wp(20),
    justifyContent: 'center',
    borderRadius: wp(80),
    alignItems: 'center',
  },
  text: {
    padding: wp(1),
    textAlign: 'center',
    fontSize:width * 0.045,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default FlashSaleComponent;
