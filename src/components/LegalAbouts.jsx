import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import styles1 from '../../assets/stylecomponents/Style';
import { useNavigation } from '@react-navigation/native';
import Header from '../navigation/customheader/Header';



const LegalAbouts = (props) => {
  const navigation=useNavigation();
  useEffect(() => {
    // Lock orientation to portrait when the screen is focused

    // Unlock orientation on screen unmount
    return () => {
    };
  }, []);
  return (
    <View style={[styles.container, styles1.bgwhite]}>
      <ScrollView>    
        <Header normal={true} screenName={'Legal & About Us'} rootProps={props} />
        <View style={{backgroundColor: 'white'}}>
          <View style={styles.profile}>
            <View style={styles.profileImageContainer}>
              <Image source={require('../../assets/img/sandip1.png')} resizeMode='center' style={styles.profileImage} />
            </View>
            <View style={{marginLeft: wp(5), width: wp(60)}}>
              <Text style={styles.profileName}>Sandip Chothave</Text>
              <Text style={styles.profileTitle}>Founder & CEO Plywood Bazar.Com</Text>
            </View>
          </View>
          <View style={styles.profile}>
            <View style={styles.profileImageContainer}>
              <Image  resizeMode='center'     source={require('../../assets/img/purva.jpg')} style={styles.profileImage} />
            </View>
            <View style={{marginLeft: wp(5), width: wp(60)}}>
              <Text style={styles.profileName}>Purva Chothave</Text>
              <Text style={styles.profileTitle}>COO Plywood Bazar.Com</Text>
            </View>
          </View>
          <View style={styles.notifications}> 
            <Text style={styles.notificationsTitle}>Our Company Motto</Text>

            <Text style={styles.notificationsText}>Plywood Bazar.Com Is A Startup That Is Working To Improve This Unorganized Furniture, Interior And Exterior Industry By Co-Ordinate In Between Them. Providing Large Potential Market Exposure For Business Expansion.</Text>
          </View>
        </View>
        
        <View style={styles.footer}>
          <View style={{backgroundColor: '#FFFFFF', padding: wp(7), borderRadius: 40, elevation: 30, top: wp(-35)}}>
            <TouchableOpacity style={styles.footerButton} onPress={()=> navigation.navigate('Privacy')}>
              <Text style={styles.footerButtonText}>Privacy Policy</Text>
              
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerButton} onPress={()=> navigation.navigate('TermsAndConditions')}>
              <Text style={styles.footerButtonText}>Terms & Condition</Text>
              
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerButton} onPress={()=> navigation.navigate('Aboutus')}>
              <Text style={styles.footerButtonText}>About us</Text>
              
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerButton} onPress={()=> navigation.navigate('EventsOrActivitiesPage')}>
              <Text style={styles.footerButtonText}>Activities</Text>
              
            </TouchableOpacity>
          </View>

          <View style={styles.legal}>
            <Text style={styles.legalTitle}>Legal</Text>

            <Text style={styles.legalText}>
              Connecting Business People Worldwide Plywood Bazar.Com Is India's Largest Online B2B Market Place Brought A Platform To Interact With Manufacturers, Distributors, Dealers, Wholesalers And Retailers Of Furniture, Plywood, Hardware & Interior Exterior Industries.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ddd',
  },
  logo: {
    width: wp(70),
    height: wp(10),
  },

  profile: {
    alignItems: 'center',
    padding: wp(3),
    flexDirection: 'row',
    backgroundColor:'white'
  },
  profileImageContainer: {
    width: wp(32),
    height: wp(32),
    backgroundColor: 'white',
    borderColor: '#ddd',
    overflow: 'hidden',
    marginBottom: wp(1),
    alignItems: 'center',
    elevation:wp(50),
    borderRadius:wp(2),
    
    justifyContent: 'center',
    elevation: wp(20), // For Android shadow

    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {width: 30, height: 20}, // Moves the shadow to the right
    shadowOpacity: 0.3, // Adjust the opacity of the shadow
    shadowRadius: 5, // Adjust the blur radius of the shadow
  },

  profileImage: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
    elevation:wp(10),
    borderRadius:wp(2),
    borderColor: '#FFFFFF',
    
  },
  profileName: {
    fontSize: wp(5),
    fontWeight: 'bold',
    marginBottom: 3,
  },
  profileTitle: {
    fontSize: wp(3.2),
  },
  notifications: {
    alignItems: 'center',
    marginBottom: wp(35),
    padding: wp(1),
  },
  notificationsTitle: {
    fontSize: wp(5),
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#8A684D',
  },
  notificationsText: {
    fontSize: wp(3.5),
    paddingHorizontal: wp(3),
    textAlign: 'justify',
  },
  footer: {
    padding: wp(5),
    backgroundColor: '#8A684D',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center',
    // flex:1
  },
  footerButton: {
    padding: wp(2.5),
    marginBottom: wp(1.5),
    backgroundColor: '#FFF1E6',
    borderRadius: 25,
    marginHorizontal: wp(5),
    width: wp(70),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: wp(1),
  },
  footerButtonText: {
    // textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
    fontSize: wp(3),
    marginHorizontal: wp(2),
    padding: wp(1.5),
  },
  legal: {
    padding: wp(1),
    top: wp(-22),
  },
  legalTitle: {
    fontSize: wp(5),
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
  },
  legalText: {
    fontSize: wp(3.5),
    color: '#FFFFFF',
    width: wp(80),
    textAlign: 'justify',
    lineHeight: wp(5),
  },
});

export default LegalAbouts;
