import { StyleSheet, View, Image, Text } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import LinearGradient from 'react-native-linear-gradient';

const BottomBanner = () => {
    return (
        <View style={styles.container}>
            {/* Wrapper for the rounded content */}
            <View style={styles.roundedContainer}>
                <LinearGradient 
                    style={styles.mainContainer}
                    colors={['#FFFFFF', '#ebbb60', '#cc8d19']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <View style={styles.roundContainer}>
                        <Image style={styles.iconStyle} source={require('../../assets/img/tell.png')} />
                        <Text style={styles.textStyle}>TELL US WHAT YOU NEED</Text>
                    </View>
                    <View style={styles.roundContainer}>
                        <Image style={styles.iconStyle} source={require('../../assets/img/seal.png')} />
                        <Text style={styles.textStyle}>SEAL THE DEAL</Text>
                    </View>
                    <View style={styles.roundContainer}>
                        <Image style={styles.iconStyle} source={require('../../assets/img/receive.png')} />
                        <Text style={styles.textStyle}>RECEIVE FREE QUOTES</Text>
                    </View>
                </LinearGradient>
            </View>

            {/* Hero Image Positioned Outside the Rounded Wrapper */}
            <Image style={styles.heroImageStyle} source={require('../../assets/img/hero3.png')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: wp(100),
        height: wp(30),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: wp(5),
        position: 'relative',  // Ensure the hero image can be positioned relatively to this container
    },
    roundedContainer: {
        width: '97%',
        height: '95%',
        borderRadius: 25,
        overflow: 'hidden',  // Apply rounded corners and ensure content is clipped inside
    },
    mainContainer: {
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    roundContainer: {
        flexDirection: 'column',
        borderRadius: 50,
        backgroundColor: '#cc8d19',
        height: wp(20),
        width: wp(20),
        marginStart: wp(1),
        justifyContent: 'center',
        alignItems: 'center',
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        // Elevation for Android
        elevation: 10,
    },
    iconStyle: {
        height: '30%',
        width: '30%',
    },
    textStyle: {
        color: 'white',
        fontSize: wp(2.8),
        textAlign: 'center',
        width: wp(18),
    },
    // Hero image outside the main container for overflow without clipping
    heroImageStyle: {
        position: 'absolute',
        right: -wp(1), // Adjust as needed for overflow
        bottom: wp(2), // Adjust as needed for overflow
        height: wp(40), // Adjust height
        width: wp(40),  // Adjust width
        resizeMode: 'stretch', // Keep aspect ratio
        zIndex: 1,
    }
});

export default BottomBanner;
