import { useIsFocused, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import React, { useEffect, useState, useContext } from 'react';
import { FlatList, Linking, Image, ImageBackground, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Video from 'react-native-video';
import { isAuthorisedContext } from '../navigation/Stack/Root';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../assets/stylecomponents/Style';
import Header from '../ReusableComponents/Header';
import { GetDealershipOpportunities, getForHomepage } from '../services/Advertisement.service';
import { getBlogApi } from '../services/Blog.service';
import { getBlogVideoApi } from '../services/BlogVideo.service';
import { getAllCategories } from '../services/Category.service';
import { getAllFlashSales } from '../services/FlashSales.service';
import { addUserRequirement } from '../services/UserRequirements.service';
import { generateImageUrl } from '../services/url.service';
import { errorToast, toastSuccess } from '../utils/toastutill';
import { checkForValidSubscriptionAndReturnBoolean, getDecodedToken, getUserById, getUserUserById, topProfilesHomePage } from '../services/User.service';
// import { WebView } from 'react-native-webview';
import YoutubePlayer from 'react-native-youtube-iframe';
import LikeProduct from '../ReusableComponents/ProductsYouMayLike';
import CustomRoundedTextButton from '../ReusableComponents/CustomRoundedTextButton';
import CustomButton from '../ReusableComponents/CustomButton';
import NewArrivalProductCard from '../ReusableComponents/NewArrivalProductCard';
import TopProfilesCard from '../ReusableComponents/TopProfilesCard';
import CustomSearchComponent from '../ReusableComponents/CustomSearchComponent';
import CustomTextInputField from '../ReusableComponents/CustomTextInputField';
import CategorySlider from '../ReusableComponents/CategorySlider';
import StartBusinessBanner from '../ReusableComponents/StartBusinessBanner';
import BlogsItem from '../ReusableComponents/BlogsItem';
import BottomBanner from '../ReusableComponents/BottomBanner';
import TopProfileHomeCard from '../ReusableComponents/TopProfileHomeCard';
import StateItem from '../ReusableComponents/StateItem';
import FlashSaleComponent from '../ReusableComponents/FlashSaleComponent';
import AddOpportunitiesHomeBanner from '../ReusableComponents/AddOpportunitiesHomeBanner';
import FadeRibbonText from '../ReusableComponents/FadeRibbon';
import CustomButtonNew from '../ReusableComponents/CustomButtonNew';
import CustomColors from '../styles/CustomColors';
import FlashSaleItemWithDiscount from '../ReusableComponents/FlashSaleItemWithDiscount';
import NewArrivalProductCardVertical from '../ReusableComponents/NewArrivalProductCardVertical';
import OpportunitiesItem from '../ReusableComponents/OpportunitiesItem';
import CustomButtonOld from '../ReusableComponents/CustomButtonOld';
import { getProductYouMayLike } from '../services/Product.service';
import { stateDetails } from '../services/State.service';
import Carousel from 'react-native-snap-carousel';
import LoadingOverlay from '../ReusableComponents/LoadingOverlay';

export default function Home() {
  const navigate = useNavigation();
  const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
  const [isloding, setIsloding] = useState(false);
  const [applyFormModal, setApplyFromModal] = useState(false);
  const [categoryArr, setCategoryArr] = useState([]);
  const [flashSalesArr, setFlashSalesArr] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [productName, setProductName] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [location, setLocation] = useState('');
  const [brand, setBrand] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('');
  const [advertisementsArr, setAdvertisementsArr] = useState([]);
  const [topprofiles, settopprofiles] = useState([]);
  const [stateDetailss, setstateDetails] = useState([]);
  console.log('stateDetailss', stateDetailss);

  const { height, width } = useWindowDimensions();
  const [currentUserHasActiveSubscription, setCurrentUserHasActiveSubscription] = useState(false);
  const [isAuthorized] = useContext(isAuthorisedContext);
  const focused = useIsFocused();

  const [blogsArr, setBlogsArr] = useState([]);
  const [oppdata, setoppdata] = useState([]);
  const [blogVideoArr, setBlogVideoArr] = useState([]);
  const [likeproductarray, setlikeproductarray] = useState([]);
  const [addressInFromFiled, setAddressInFormFiled] = useState('');

  const [loadingIndicator, setLoadingIndicator] = useState(false)



  const handleGetBlogs = async () => {
    try {
      let { data: res } = await getBlogApi();
      if (res.data) {
        setBlogsArr(res.data);
      }
    } catch (err) {
    }
  };
  const handleopportunitydata = async () => {
    try {
      let { data: res } = await GetDealershipOpportunities();
      if (res.data) {
        setoppdata(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const gototopprofile = (item) => {
    if (isAuthorized) {
      if (!currentUserHasActiveSubscription) {
        Alert.alert(
          'Subscription Required',
          'You do not have a valid subscription to perform this action.',
          [
            {
              text: 'Go to Subscriptions',
              style: { color: "red" },
              onPress: () => navigate.navigate('Subscriptions', { register: false }),
            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ],
          { cancelable: true }
        );
        return;
      }
      // Linking.openURL(tel:${phone});
      navigate.navigate('Supplier', { data: item })
    }
    else {
      Alert.alert(
        'Login Required',
        'Please login to access this feature.',
        [
          {
            text: 'Go to Login',
            onPress: () => navigate.navigate('Login'),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        { cancelable: true }
      );
    }
  };
  const getauthuser = async () => {
    let decoded = await getDecodedToken();
    if (decoded && decoded?._id) {
      setuserid(decoded?._id);
      getUserById(decoded?._id);
    }
  };

  const handleGetBlogVideo = async () => {
    try {
      let { data: res } = await getBlogVideoApi();
      if (res.data) {
        setBlogVideoArr(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleproductyoumaylike = async () => {
    try {
      let { data: res } = await getProductYouMayLike();
      if (res.data) {
        setlikeproductarray(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (focused) {
      handleGetBlogs();
      handleGetBlogVideo();
      handleproductyoumaylike();
      handleopportunitydata();
      handlestates();
    }
  }, [focused]);

  const handleSubmitRequirement = async () => {
    try {
      if (name == '') {
        errorToast('Name cannot be empty');
        return;
      }
      if (phone == '') {
        errorToast('Mobile number cannot be empty');
        return;
      }
      if (addressInFromFiled == '') {
        errorToast('Address cannot be empty');
        return;
      }
      if (productName == '') {
        errorToast('Product cannot be empty');
        return;
      }

      let obj = {
        name,
        phone,
        address,
        productName,
      };

      setLoadingIndicator(true);
      let { data: res } = await addUserRequirement(obj);

      if (res.message) {
        console.log('xxxxxxx', res.message)
        toastSuccess(res.message);
        // Alert.alert(res.message)
        setName('');
        setPhone('');
        setAddressInFormFiled('');
        setProductName('');
        setLoadingIndicator(false)
      }
    } catch (err) {
      errorToast(err);
      setLoadingIndicator(false);

    }
  };
  const handleApplySubmitRequirement = async () => {
    setApplyFromModal(true)
    try {
      if (organizationName == '') {
        errorToast('Name cannot be empty');
        return;
      }
      if (productName == '') {
        errorToast(' Product Name cannot be empty');
        return;
      }
      if (type == '') {
        errorToast('Type number cannot be empty');
        return;
      }
      if (brand == '') {
        errorToast('Brand cannot be empty');
        return;
      }
      if (location == '') {
        errorToast('Location cannot be empty');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errorToast('Product cannot be empty');
        return;
      }


      let obj = {
        name,
        phone,
        address,
        productName,
      };

      let { data: res } = await addUserRequirement(obj);

      if (res.message) {
        toastSuccess(res.message);
        setName('');
        setPhone('');
        setAddress('');
        setProductName('');
      }
    } catch (err) {
      errorToast(err);
    }
  };


  const handelcallbtn = (phone) => {
    if (isAuthorized) {
      if (!currentUserHasActiveSubscription) {
        Alert.alert(
          'Subscription Required',
          'You do not have a valid subscription to perform this action.',
          [
            {
              text: 'Go to Subscriptions',
              style: { color: "red" },
              onPress: () => navigate.navigate('Subscriptions', { register: false }),
            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ],
          { cancelable: true }
        );
        return;
      }
      Linking.openURL(`tel:${phone}`);
    } else {
      Alert.alert(
        'Login Required',
        'Please login to access this feature.',
        [
          {
            text: 'Go to Login',
            onPress: () => navigate.navigate('Login'),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        { cancelable: true }
      );
    }
  };
  useEffect(() => {
    HandleCheckValidSubscription();
  }, [isAuthorized])

  const HandleCheckValidSubscription = async () => {
    try {
      let decoded = await getDecodedToken();
      if (decoded) {
        if (decoded?.user?.name) {
          setName(decoded?.user?.name);
        }

        let { data: res } = await checkForValidSubscriptionAndReturnBoolean(decoded?.userId);
        if (res.data) {

          setCurrentUserHasActiveSubscription(res.data);
        }
      }
    } catch (err) {
      errorToast(err);
    }
  };
  const handleGetSubscriptions = async () => {
    try {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() - 1); // even 32 is acceptable
      let endDate = `${tomorrow.getFullYear()}-${(tomorrow.getMonth() + 1 < 10 ? '0' : '') + (tomorrow.getMonth() + 1)}-${(tomorrow.getDate() + 1 < 10 ? '0' : '') + tomorrow.getDate()}`;

      let { data: res } = await getAllFlashSales('endDate=' + endDate);
      if (res.data) {
        setFlashSalesArr(res.data);


      }
    } catch (err) {
      errorToast(err);
    }
  };

  const handleNestedcategories = async () => {
    setIsloding(true);
    try {
      let { data: res } = await getAllCategories('level=1');
      if (res.data && res.data?.length > 0) {
        setCategoryArr(res.data);
        setIsloding(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetAdvvertisementForHomepage = async () => {
    try {
      let { data: res } = await getForHomepage();
      if (res.data) {
        setAdvertisementsArr(res.data);

      }
    } catch (err) {
      errorToast(err);
    }
  };
  const handletopProfiles = async () => {
    try {
      let { data: res } = await topProfilesHomePage();
      if (res.data) {

        settopprofiles(res.data);

      }
    } catch (err) {
      errorToast(err);
    }
  };
  const handlestates = async () => {
    try {
      let { data: res } = await stateDetails();
      if (res.data) {

        setstateDetails(res.data);


      }
    } catch (err) {
      errorToast(err);
    }
  };

  useEffect(() => {
    if (focused) {
      handleGetAdvvertisementForHomepage();
      handleNestedcategories();
      handleGetSubscriptions();
      handletopProfiles();
    }
  }, [focused]);

  const GotoFlash = () => {
    if (isAuthorized) {
      if (!currentUserHasActiveSubscription) {
        Alert.alert(
          'Subscription Required',
          'You do not have a valid subscription to perform this action.',
          [
            {
              text: 'Go to Subscriptions',
              style: { color: "red" },
              onPress: () => navigate.navigate('Subscriptions', { register: false }),
            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ],
          { cancelable: true }
        );
        return;
      }
      navigate.navigate('MyFlashSales')

    }
    else {
      Alert.alert(
        'Login Required',
        'Please login to access this feature.',
        [
          {
            text: 'Go to Login',
            onPress: () => navigate.navigate('Login'),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        { cancelable: true }
      );
    }
  }
  const GotoFlashSaleCallIcon = (item) => {
    console.log('calldta', item.productId.createdByObj.phone);

    if (isAuthorized) {
      if (!currentUserHasActiveSubscription) {
        Alert.alert(
          'Subscription Required',
          'You do not have a valid subscription to perform this action.',
          [
            {
              text: 'Go to Subscriptions',
              style: { color: "red" },
              onPress: () => navigate.navigate('Subscriptions', { register: false }),
            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ],
          { cancelable: true }
        );
        return;
      }
      handelcallbtn(item?.productId?.createdByObj?.phone)
    }
    else {
      Alert.alert(
        'Login Required',
        'Please login to access this feature.',
        [
          {
            text: 'Go to Login',
            onPress: () => navigate.navigate('Login'),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        { cancelable: true }
      );
    }
  }
  const GotoGetQuote = (item) => {
    if (isAuthorized) {
      navigate.navigate('Productdetails', { data: item?.product?.slug })
    }
    else {
      Alert.alert(
        'Login Required',
        'Please login to access this feature.',
        [
          {
            text: 'Go to Login',
            onPress: () => navigate.navigate('Login'),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        { cancelable: true }
      );
    }
  }

  const renderProductsYouMayLike = ({ item, index }) => {
    return <LikeProduct imagePath={{ uri: generateImageUrl(item?.product?.mainImage) }} name={item.productName} location={item.cityName} onCallPress={() => handelcallbtn(item.createdByObj.companyObj.phone)} onGetQuotePress={() => { GotoGetQuote(item) }} onPress={() => navigate.navigate('Productdetails', { data: item?.product?.slug })} />

  };

  const renderNewArrivals = ({ item, index }) => {
    console.log('zxcv', JSON.stringify(item))
    return <NewArrivalProductCardVertical    horizontal newProductItem={item} image={{ uri: generateImageUrl(item?.image) }} onPress={() => navigate.navigate('Productdetails', { data: item.productSlug })} onCallPress={() => handelcallbtn(item?.phone)}></NewArrivalProductCardVertical>;
  };



  const renderFlashSale = ({ item, index }) => {
    return (
      <View style={{ marginHorizontal: wp(1) }}>
        <FlashSaleItemWithDiscount imagePath={{ uri: generateImageUrl(item?.productId?.mainImage) }}
          actualPrice={item?.price}
          name={item?.productId?.name}
          salePrice={item?.salePrice}
          duration={10}
          offPercentage={item?.discountValue}
          discountType={item?.discountType}
          EndDate={item?.endDate}
          onCallPress={() => { GotoFlashSaleCallIcon(item) }}
        ></FlashSaleItemWithDiscount>
      </View>
    );
  };
  const renderBlogs = ({ item, index }) => {
    return <BlogsItem item={item}></BlogsItem>;
  };
  const renderVideo = ({ item, index }) => {
    return (
      <>
        <View style={{ width: wp(85), height: wp(47), marginRight: wp(2), marginLeft: wp(2), borderRadius: 15, overflow: 'hidden' }}>
          <YoutubePlayer height={wp(47)} play={false} videoId={item.url?.split('embed/')[1]} style={{ resizeMode: 'cover', borderRadius: 20 }} />
        </View>
      </>
    );
  };
  const renderOpportunities = ({ item, index }) => {
    return (
      <OpportunitiesItem opportunityItem={{ imagePath: { uri: generateImageUrl(item?.image) }, title: item.Brand, isExclusive: true, stateName: item?.stateName }} onApplyPress={() => { gotoApplyOpportunities(item) }} ></OpportunitiesItem>
    );
  };
  const GotoAddProduct = () => {
    if (isAuthorized) {
      if (!currentUserHasActiveSubscription) {
        Alert.alert(
          'Subscription Required',
          'You do not have a valid subscription to perform this action.',
          [
            {
              text: 'Go to Subscriptions',
              style: { color: "red" },
              onPress: () => navigate.navigate('Subscriptions', { register: false }),
            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ],
          { cancelable: true }
        );
        return;
      }

      navigate.navigate('AddAdvertisement')

    }
    else {
      Alert.alert(
        'Login Required',
        'Please login to access this feature.',
        [
          {
            text: 'Go to Login',
            onPress: () => navigate.navigate('Login'),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        { cancelable: true }
      );
    }
  }
 
  const Gotoopportunities = () => {
    if (isAuthorized) {
      if (!currentUserHasActiveSubscription) {
        Alert.alert(
          'Subscription Required',
          'You do not have a valid subscription to perform this action.',
          [
            {
              text: 'Go to Subscriptions',
              style: { color: "red" },
              onPress: () => navigate.navigate('Subscriptions', { register: false }),
            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ],
          { cancelable: true }
        );
        return;
      }

      navigate.navigate('AddDealershipOpportunitiesForm')

    }
    else {
      Alert.alert(
        'Login Required',
        'Please login to access this feature.',
        [
          {
            text: 'Go to Login',
            onPress: () => navigate.navigate('Login'),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        { cancelable: true }
      );
    }
  }

  const gotoApplyOpportunities = (item) => {
    if (isAuthorized) {
      if (!currentUserHasActiveSubscription) {
        Alert.alert(
          'Subscription Required',
          'You do not have a valid subscription to perform this action.',
          [
            {
              text: 'Go to Subscriptions',
              style: { color: "red" },
              onPress: () => navigate.navigate('Subscriptions', { register: false }),
            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ],
          { cancelable: true }
        );
        return;
      }

      navigate.navigate('ApplyOppFor', { Data: item })

    }
    else {
      Alert.alert(
        'Login Required',
        'Please login to access this feature.',
        [
          {
            text: 'Go to Login',
            onPress: () => navigate.navigate('Login'),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        { cancelable: true }
      );
    }
  }

  return (
    <>
      <View style={[styles.bgwhite]}>
        <LoadingOverlay visible={loadingIndicator} message="Please wait..." />
        <View style={{ width: wp(90), alignSelf: 'center', marginTop: wp(3), paddingVertical: wp(1.5) }} >
          <CustomTextInputField placeholder="Search Here" imagePath={require('../../assets/img/ic_search.png')} editable={false} onPress={() => navigate.navigate('Search')}></CustomTextInputField>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index}
          //Header to show above listview
          removeClippedSubviews={true}
          ListHeaderComponent={
            <>
              <Header slidersection />
            </>
          }
          //Footer to show below listview

          ListFooterComponent={
            < >
              { }


              <>{isloding ? <ShimmerPlaceHolder style={{ width: wp(100), height: wp(22), marginRight: 10 }} /> : <CategorySlider data={categoryArr}></CategorySlider>}</>


              <LinearGradient

                colors={['#ebbb60', '#ebbb60', '#F1E8D1', '#FFF']}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                style={{ marginTop: wp(5), paddingBottom: wp(5) }}
              >
                <View style={[styles.padinghr, styles1.flexbetwen, { marginBottom: wp(6) }]}>
                  <Text style={{ fontSize: wp(6), fontWeight: 800, color: 'white' }}>New Arrivals</Text>
                  <Pressable >
                    <CustomButtonNew textSize={wp(4)} text="Add" paddingVertical={wp(2)} paddingHorizontal={wp(6)} onPress={() => GotoAddProduct()} />
                  </Pressable>
                </View>
                <Carousel
                  data={advertisementsArr}
                  renderItem={renderNewArrivals}
                  sliderWidth={wp(100)}
                  itemWidth={wp(45)}
                  loop={true}
                  autoplay={true}
                  autoplayDelay={1000}
                  autoplayInterval={3000}
                  layout={'default'}
                  inactiveSlideScale={0.68}
                  inactiveSlideOpacity={0.5}
                  contentContainerStyle={{}

                  }
                />
              </LinearGradient>

              <Text style={styles1.topprofiletext} >Top Profiles</Text>
              <Carousel
                data={topprofiles}
                renderItem={({ item }) => (
                  <TopProfileHomeCard title={item.companyName} image={{ uri: generateImageUrl(item.bannerImage) }} rating={item.rating} Product={item.productsCount} onPress={() => gototopprofile(item)} onCallPress={() => handelcallbtn(item?.phone)} item={item} />
                )}
                sliderWidth={wp(100)}
                itemWidth={wp(80)}
                loop={true}
                autoplay={true}
                autoplayDelay={1000}
                autoplayInterval={3000}
                layout={'default'}
                inactiveSlideScale={0.9}
                inactiveSlideOpacity={1}
                contentContainerStyle={{ marginBottom: wp(5) }}
              />








              {isAuthorized === 'false' && (
                <View style={{ marginVertical: wp(5) }}>
                  <StartBusinessBanner />
                </View>
              )}





              <LinearGradient
                colors={['#cc8d19', '#ebbb60', '#F1E8D1']} // Gradient colors (left to right)
                style={[styles1.tableimagewrap,]} // Apply the gradient to this style
                start={{ x: 0, y: 1 }} // Start point of the gradient=
              >


                <View style={[styles1.textwrap]}>
                  <Text style={{ fontSize: wp(3.5) }}>Unlock endless possibilities</Text>
                  <Text style={{ fontSize: wp(3.5) }}>with our</Text>
                  <View style={{ flexDirection: 'row', marginTop: 0 }}>
                    <Text style={{ fontSize: wp(4.5), color: '#FFFFFF', fontWeight: 'bold' }}>Subscription!</Text>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginHorizontal: wp(1), height: wp(6), width: wp(6) }}>

                      <MaterialCommunityIcons name="currency-inr" size={wp(5)} color='black' />

                    </View>

                  </View>

                </View>
                <View style={styles1.imagewrap}>
                  <Image
                    source={require('../../assets/img/hero2.png')} // Replace with your image path
                    style={styles1.image1}
                  />
                </View>

              </LinearGradient>

              <View style={[styles.padinghr, styles1.flexbetwen]}>
                <Text style={[styles1.headingmain, { fontWeight: 800, color: 'black', marginBottom: wp(5) }]}>Flash Sales</Text>
                <Pressable onPress={() => navigate.navigate('AllProducts')}>
                  <CustomButtonOld textSize={wp(4)} text={"Add"} onPress={() => { GotoFlash() }}></CustomButtonOld>
                </Pressable>
              </View>
              <View style={{ flexDirection: 'row', paddingHorizontal: wp(2), }}
              >
                <FlashSaleComponent style={[styles.padinghr, { position: 'absolute' }]}></FlashSaleComponent>
                <FlatList style={[styles.mttop10, { paddingHorizontal: wp(4) }]} contentContainerStyle={{ paddingTop: 5, paddingBottom: 10 }} data={flashSalesArr} horizontal renderItem={renderFlashSale} keyExtractor={(item, index) => `${index}`} />
              </View>


              <View style={[styles.padinghr, styles1.flexbetwen]}>
                <Text style={styles1.headingmain}>Products You May Like</Text>
                <CustomButtonOld textSize={wp(4)} text="View All" onPress={() => GotoProductspage()} />
              </View>
              <FlatList
                style={styles.mttop10}
                contentContainerStyle={{ paddingTop: 5, paddingBottom: 10 }}
                data={likeproductarray}
                horizontal
                columnWrapperStyle={styles.columnWrapper} // Style for aligning columns
                renderItem={renderProductsYouMayLike}
                keyExtractor={(item, index) => `${index}`}
              />

              <View>

                <Text style={[styles1.headingmain, { marginVertical: wp(5), marginBottom: wp(5), alignSelf: 'center' }]} numberOfLines={1} ellipsizeMode="tail">States</Text>
                <Carousel
                  data={stateDetailss}
                  renderItem={({ item }) => (
                    <StateItem item={item} onPress={() => { navigate.navigate('VendorListByState', { data: item, xState: item?.stateId?._id }) }}></StateItem>
                  )}
                  sliderWidth={wp(100)}
                  itemWidth={wp(35)}
                  loop={true}
                  autoplay={true}
                  autoplayDelay={1000}

                  autoplayInterval={5000}
                  layout={'default'}
                  inactiveSlideScale={0.60}
                  inactiveSlideOpacity={0.9}
                  contentContainerStyle={{ marginBottom: wp(5) }}
                />
              </View>

              <View style={[styles.padinghr, { alignSelf: 'center', alignItems: 'center', justifyContent: 'space-between', marginBottom: wp(2), paddingBottom: wp(2.5) }]}>
                <Text style={[styles1.headingmain, { marginBottom: wp(5) }]}>Dealership/Franchise Opportunities</Text>
                <AddOpportunitiesHomeBanner style={{ marginTop: wp(5) }} onPress={() => Gotoopportunities()}></AddOpportunitiesHomeBanner>
              </View>


              <FlatList data={oppdata} horizontal renderItem={renderOpportunities} keyExtractor={(item, index) => `${index}`} />






              <View style={[styles.padinghr, styles1.videoCardHome]}>

                <Text style={[styles1.headingmain]}>Videos</Text>
                <CustomButtonOld textSize={wp(4)} text="View All" onPress={() => { navigate.navigate('Blogs', { data: false }) }} />
              </View>
              <FlatList data={blogVideoArr} horizontal renderItem={renderVideo} keyExtractor={(item, index) => `${index}`} />

              <View style={[styles.padinghr, { alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginTop: wp(7), marginBottom: 10 }]}>
                <Text style={[styles1.headingmain]}>Blogs</Text>
                <CustomButtonOld textSize={wp(4)} text="View All" onPress={() => { navigate.navigate('Blogs', { data: true }) }} />
              </View>

              <FlatList contentContainerStyle={{ paddingTop: 5, paddingBottom: 10 }} data={blogsArr} horizontal renderItem={renderBlogs} keyExtractor={(item, index) => `${index}`} />






              <View style={styles1.containerForm}>
                <Text style={styles1.textStyle}>TELL US YOUR REQUIREMENT</Text>
                <View style={styles1.textFieldContainer}>
                  <View style={{ height: wp(1) }} />
                  <CustomTextInputField placeholder='Name*' onChangeText={value => setName(value)} value={name} /><View style={{ height: wp(1) }} />
                  <CustomTextInputField placeholder='Mobile Number*' onChangeText={(value) => {
                    const sanitizedText = value.replace(/[^0-9]/g, '').slice(0, 10);
                    setPhone(sanitizedText)
                    value = sanitizedText
                  }

                  } inputType='number' maxLength={10} value={phone} /><View style={{ height: wp(1) }} />
                  <CustomTextInputField placeholder='Address*' onChangeText={value => setAddressInFormFiled(value)} value={addressInFromFiled} />
                  <View style={{ height: wp(1) }} />
                  <CustomTextInputField placeholder='Product/Service*' onChangeText={value => setProductName(value)} value={productName} />
                  <View style={{ height: wp(1) }} />
                </View>
                <View style={styles1.btnContainer}>
                  <TouchableOpacity onPress={() => { handleSubmitRequirement() }}>
                    <Text style={{ color: 'white', paddingVertical: wp(4), fontSize: wp(4), fontWeight: 'bold', width: '100%', textAlign: 'center' }}>SUBMIT</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ marginBottom: wp(18), marginTop: wp(7) }}>
                <BottomBanner></BottomBanner>
              </View>






            </>
          }
        />

      </View>
    </>
  );
}
const styles1 = StyleSheet.create({
  mbboot: {
    fontSize: 13,
    marginBottom: 10,
    fontFamily: 'Outfit-Medium',
  },
  tellcontnt: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
    color: '#000',
    fontFamily: 'Manrope-Regular',
  },
  col4: {
    alignItems: 'center',
  },
  imgresponsive: {
    width: wp(20),
    height: hp(10),
  },
  flexevenely: {
    marginTop: 10,
    display: 'flex',
    // alignItems:'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  textqoute: {
    textAlign: 'center',
    color: '#000',
    fontFamily: 'Manrope-Medium',
    marginBottom: 5,
    fontSize: 18,
  },
  btnstart: {
    backgroundColor: '#fff',
    borderColor: '#6193B5',
    marginTop: 12,
    padding: 6,
    textAlign: 'center',
    fontSize: 9,
    width: wp(30),
    borderWidth: 1,
    borderRadius: 10,
    fontFamily: 'Manrope-Regular',
  },
  textcenter: {
    color: '#6193B5',
    fontSize: 10,
    textAlign: 'center',
  },
  pgre: {
    color: '#888888',
    fontFamily: 'Manrope-Light',
    fontSize: 10,
  },
  headngsell: {
    color: '#000',
    fontFamily: 'Manrope-Regular',
    marginBottom: 5,
  },
  imgflex1: {
    flex: 1,
    width: wp(26),
    height: hp(13),
  },
  flexontent: {
    flex: 2,
  },
  morebox: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    backgroundColor: '#ebf4fa',
    borderRadius: 20,
    padding: 10,
    marginBottom: 15,
  },
  morebox1: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    backgroundColor: '#E4EFEC',
    borderRadius: 20,
    padding: 10,
    marginBottom: 15,
  },
  morebox2: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    backgroundColor: '#F8ECF0',
    borderRadius: 20,
    padding: 10,
    marginBottom: 15,
  },

  logobrands: {
    width: 90,
    height: 60,
  },
  imgrounder: {
    width: wp(20),
    height: hp(10),
  },
  cityname: {
    textAlign: 'center',
  },
  sqirft: {
    fontSize: 10,
    color: '#8E8E8E',
  },
  priceproce: {
    textAlign: 'center',
    fontFamily: 'Manrope-Medium',
    color: '#000',
  },
  sizeprod: {
    textAlign: 'center',
    fontFamily: 'Poppins-Light',
    color: '#000',
    marginVertical: 5,
    fontSize: 10,
  },
  sizelenth: {
    fontFamily: 'Poppins-Medium',
    color: '#000',
    textAlign: 'center',
  },
  infoproduct: {
    marginVertical: 5,
  },
  imgphone: {
    width: wp(14),
    height: hp(7),
    position: 'absolute',
    top: -10,
    right: -10,
    borderColor: '#fff',
    borderWidth: 5,
    borderRadius: 100,
    zIndex: 5,
  },
  producthead: {
    textAlign: 'center',
    color: '#000',
    fontSize: 12,
    fontFamily: 'Manrope-Medium',
  },
  boxproduct: {
    backgroundColor: '#fff',
    padding: 10,
    position: 'relative',
    borderRadius: 10,
    width: wp(50),
    marginRight: 20,
    overflow: 'visible',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.41,
    elevation: 2,
  },
  cityboxproduct: {
    backgroundColor: '#fff',
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderRadius: 10,
    width: wp(30),
    marginRight: 20,
    overflow: 'visible',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.41,
    elevation: 2,
  },
  logobround: {
    backgroundColor: '#fff',
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderRadius: 10,
    width: wp(32),
    marginRight: 20,
    overflow: 'visible',
  },

  imgfluid: {
    width: wp(45),
    height: hp(20),
    borderRadius: 10,
    // marginBottom:10,
  },
  viewall: {
    color: '#B08218',
    fontSize: 12,
    fontFamily: 'Manrope-Medium',
  },
  flexbetwen: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: wp(5)
  },
  imgsize: {
    width: wp(100),
    height: wp(40),
  },
  sliderhome: {
    marginVertical: 15,
  },
  headingmain: {
    fontSize: wp(5),
    fontFamily: 'Manrope-Bold',
    color: '#000',
  },
  headerslid: {
    width: wp(95),
    height: hp(25),
    borderRadius: 6,
  },
  logoheader: {
    width: wp(40),
    height: hp(8),
  },
  headermain: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowflex: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
  },
  bgimgcolor: {
    backgroundColor: 'red',
    width: wp(),
  },
  categorystyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  col6: {
    width: wp(46),
  },
  categorybix: {
    backgroundColor: '#FFF9E6',
    borderRadius: 10,
    marginBottom: 15,
    // padding: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  categorybix2: {
    backgroundColor: '#ffe6e6',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    minHeight: 150,

    position: 'relative',
  },
  centername: {
    position: 'absolute',
    bottom: 15,
    color: '#000',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
  },
  youtube: {
    height: 300,
    resizeMode: 'cover',
  },
  columnWrapper: {
    justifyContent: 'space-between', // Ensures spacing between columns
  },
  topProfileContainer: {
    paddingBottom: 20,
  },
  topProfileHeading: {
    paddingTop: 20,
    paddingBottom: 20,
    color: 'black',
    fontFamily: 'Poppins-Bold',
    fontWeight: 600,
    fontSize: 22,
    alignSelf: 'center',
  },
  videoCardHome: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: wp(7),
    borderRadius: 50
  },
  tableimagewrap: {
    flex: 1,
    height: wp(38),
    backgroundColor: '#3498db',
    borderRadius: wp(25),
    bordercolor: '#000000',
    marginTop: wp(15),
    marginHorizontal: wp(2),
    justifyContent: "center",
    overflow: 'visible',  // Ensure overflow is visible so the image can float outside

  },
  image1: {
    width: wp(60),  // Set your desired width
    height: wp(50), // Set your desired height
    resizeMode: 'contain', // Optional: control how the image fits,
    bottom: wp(5),
    overflow: 'visible'


  },
  imagewrap: {
    justifyContent: 'flex-end',
    alignItems: "flex-end",
    // left: 10,
    // bottom: 60
    position: 'absolute',
    overflow: 'visible',
    alignSelf: "flex-end",
    // marginLeft:30
  },
  textwrap: {

    // alignItems: 'center',
    justifyContent: 'center',
    // top: 120,
    marginTop: wp(15),
    marginHorizontal: wp(1),
    width: wp(60),

  },
  centeredView: {

    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  containerForm: {
    elevation: 5,
    backgroundColor: '#f4eddb',
    borderRadius: 25,
    width: wp(75),
    alignItems: 'center',
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: wp(7)
  },
  textStyle: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: wp(4),
    marginTop: wp(8),
    marginBottom: wp(3),
  },
  textFieldContainer: {
    width: '85%',
    marginBottom: wp(15),
  },
  btnContainer: {
    position: 'absolute',
    backgroundColor: CustomColors.colorNewButton,
    bottom: 0,
    width: '100%',
    justifyContent: 'center'
  },
  topprofilewrap: {
    paddingVertical: wp(5)
    // alignItems: 'center',
    // justifyContent: 'center'

  },
  topprofiletext: {
    marginTop: wp(5),
    fontSize: wp(5),
    fontWeight: 'bold',
    alignSelf: "center"
  },
  imagebg: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: wp(10)
    // paddingLeft:wp(10)
  },
});

