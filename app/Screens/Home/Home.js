import React, { useCallback, useMemo, useRef, useState, useEffect } from "react";

import {
  Text,
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
  Animated,
  TouchableOpacity,
  Image,
  SafeAreaView,
  RefreshControl, // Import RefreshControl
  Platform,
  Button,
} from "react-native";
import { useNavigation, useTheme } from '@react-navigation/native';
import { COLORS, FONTS, IMAGES, SIZES } from "../../Utils/theme";
import { GlobalStyleSheet } from "../../Utils/styleSheet";
import BannerCard from "../../components/BannerCard";
import PortfolioCard from "../../components/PortfolioCard";

import BalanceChart from "../../components/chart/BalanceChart";
import TransferSheet from "../../components/BottomSheet/TransferSheet";
import ThemeBtn from "../../components/ThemeBtn";

import Swiper from "react-native-swiper";
import FeatherIcon from 'react-native-vector-icons/Feather';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRate, useUserData, useRefarral } from '../../Api/userApi'; // Import the custom hook
import { useListUserMiner } from "../../Api/minerApi";
import PulsatingIndicator from "../../components/PulsatingIndicator";
import { loginUser, checkAuthStatus } from "../../Api/authApi";

const { width } = Dimensions.get('window');

const itemWidth = SIZES.width > SIZES.container ? (SIZES.container / 1.5) : (SIZES.width / 1.5) + 50;

const bannerData = [
  {
    id: "1",
    image: IMAGES.welcomeImg,
    title: "Earn 0.03 AGX per min",
    subTitle: "Join over 1,000,000 miners worldwide.",
  },
  /* {
    id : "2",
    image : IMAGES.welcomeImg,
    title : "Cryptocurrency Exchange",
    subTitle : "Top Most Trusted",
  },
  {
    id : "3",
    image : IMAGES.welcomeImg,
    title : "Cryptocurrency Exchange",
    subTitle : "Top Most Trusted",
  },
  {
    id : "4",
    image : IMAGES.welcomeImg,
    title : "Cryptocurrency Exchange",
    subTitle : "Top Most Trusted",
  }, */
]






const HomeScreen = ({ navigation }) => {

  const { colors } = useTheme();


  const scrollX = useRef(new Animated.Value(0)).current;
  const buttons = ['Live Miners'];
  const onCLick = i => this.scrollViewHome.scrollTo({ x: i * width });
  const [walletRBSheet, setWalletRBSheet] = useState('transfer');
  const refRBSheet = useRef();
  const bottomSheetRef = useRef(null);
  const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh

  // variables
  const snapPoints = useMemo(() => [600], []);
  const { username, email, usdbalance, machineinitcode, supportphrase, uid, loading } = useUserData();
  const { cminer, cminerAmount } = useRate();
  const { data, userRefCount } = useRefarral();

  const { minerData } = useListUserMiner();
  const [isOnline, setIsOnline] = useState(false);

  const agxAmount = cminerAmount / cminer * 60 * 24 * 31;
  const usdAmount = agxAmount * 0.0075;

  const [minerId, setMinerId] = useState();
  //console.log(minerId);

  const [refreshKey, setRefreshKey] = useState(0); // State to trigger re-render

  // Refresh BalanceChart every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey((prevKey) => prevKey + 1); // Increment refreshKey to trigger re-render
    }, 60000); // 60000ms = 1 minute

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);




  // Save state
  const handleItemPress = async (dataId) => {
    try {
      await AsyncStorage.setItem('minerId', dataId);
      navigation.navigate('ExtendOrder', { dataId });
    } catch (e) {
      // error handling
    }

  };

  //console.log(cminer);

  useEffect(() => {
    if (minerData.length) {
      console.log("Live Miner", minerData);
      setIsOnline(true);
    }
  }, [minerData]); // Run when `myOrder` updates



  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();

    // const hours = String(date.getHours()).padStart(2, "0");
    // const minutes = String(date.getMinutes()).padStart(2, "0");
    // const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year}`;
  };



  const onRefresh = async () => {
    setRefreshing(true); // Start refreshing animation

    try {
      // Example: Fetch updated data or reset state
      console.log("Refreshing data...");
      await fetchData(); // Replace with your data-fetching logic
    } catch (error) {
      console.error("Error refreshing data:", error);
    }

    setRefreshing(false); // Stop refreshing animation
  };

  const fetchData = async () => {
    // Example: Fetch data or perform any updates
    console.log("Fetching updated data...");
  };



  const CardData = [
  /*   {
      id: '1',
      icon: IMAGES.dollor,
      title: 'USD Balance',
      amount: `${new Intl.NumberFormat().format(usdbalance)}`
    }, */
    {
      id: '2',
      icon: IMAGES.trade3,
      title: 'Live Miner',
      amount: cminer

    },
    {
      id: '3',
      icon: IMAGES.referral,
      title: 'Referral',
      amount: userRefCount,
    },
  ]




  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  // renders
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
  );

  // Open Bottom Sheet
  const handleOpenPress = () => {
    bottomSheetRef.current?.expand();
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>

        <View
          style={[{
            flex: 1,
            //backgroundColor:colors.background,
          }]}
        >
          <View
            style={[GlobalStyleSheet.container, {
              flexDirection: 'row',
              paddingHorizontal: 15,
              paddingTop: 15,
              paddingBottom: 15,
            }]}
          >

            <View style={{ flex: 1 }}>
              {/* <ThemeBtn/> */}
              <PulsatingIndicator isOnline={isOnline} />


            </View>


            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{
                height: 35,
                width: 35,
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 8,
              }}
            >
              <View
                style={{

                  borderRadius: 50,
                  backgroundColor: 'rgba(255,255,255,.1)',
                }}
              >
                <Image
                  source={IMAGES.profile}
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 50,
                  }}
                />
              </View>

            </TouchableOpacity>

          </View>



          <ScrollView
            contentContainerStyle={{ paddingBottom: 100, flexGrow: 1 }}
            showsHorizontalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[COLORS.primary]} // Customize spinner color
              />
            }
          >
            <Swiper
              style={{
                height: Platform.OS === 'web' ? 330 : 190,
              }}
              dotColor={colors.borderColor}
              activeDotColor={COLORS.primary}
              paginationStyle={{
                bottom: 0,
              }}
            >
              {bannerData.map((data, index) => {
                return (
                  <View
                    key={index}
                    style={[GlobalStyleSheet.container, {
                      paddingHorizontal: 15,
                      padding: 0
                    }]}
                  >
                    <BannerCard
                      image={data.image}
                      title={data.title}
                      subTitle={data.subTitle}
                    />
                  </View>
                )
              })}
            </Swiper>
            <View style={[GlobalStyleSheet.container, { padding: 0, paddingHorizontal: -15, paddingVertical: -15 }]}>
              <BalanceChart key={refreshKey} home={true} />
            </View>

            <View
              style={[GlobalStyleSheet.container, {
                flexDirection: 'row',
                marginBottom: 25,
                marginTop: -30,
                padding: 0,
                paddingHorizontal: -10,
                paddingVertical: -15
              }]}
            >
              {CardData.map((data, index) => {
                return (
                  <View key={index}
                    style={{
                      flex: 1,
                      marginHorizontal: 3,

                    }}
                  >
                    <PortfolioCard
                      title={data.title}
                      icon={data.icon}
                      amount={data.amount}
                    />
                  </View>
                )
              })}
            </View>

            {/* 

            <View style={[GlobalStyleSheet.container, {
              padding: 0,
              marginHorizontal: 15,
              flexDirection: 'row',
              marginBottom: 12,
              marginTop: 0,
            }]}>


              <TouchableOpacity
                onPress={() => navigation.navigate('CreateOrder')}
                style={{
                  backgroundColor: COLORS.mycolor,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 8,
                  borderRadius: SIZES.radius,
                  overflow: 'hidden',
                  paddingHorizontal: 10,
                  height: 45,
                  flex: 1,
                }}>
                <View style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  backgroundColor: COLORS.mycolor2,
                  height: 45,
                  width: 45,
                  borderRightWidth: 1,
                  borderColor: 'rgba(255,255,255,.15)',
                  zIndex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <View style={{
                    height: 12,
                    width: 12,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    borderColor: 'rgba(255,255,255,.15)',
                    backgroundColor: COLORS.mycolor2,
                    position: 'absolute',
                    right: -7,
                    transform: [
                      {
                        rotate: '45deg',
                      }
                    ]
                  }}></View>
                  <Image
                    style={{
                      height: 22,
                      width: 22,
                      tintColor: '#fff',
                    }}
                    source={IMAGES.trade3} />
                </View>
                <Text style={{ ...FONTS.h6, color: COLORS.white, marginLeft: 35 }}>Create Miner</Text>
              </TouchableOpacity>
            </View>
 */}

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginHorizontal: 15,
                paddingVertical: 2,
                marginBottom: 6,
              }}
            >

              <Text style={{ ...FONTS.font, color: COLORS.white, ...FONTS.fontBold }}>Live Miners </Text>

            </View>

            <ScrollView

              horizontal
              pagingEnabled
              scrollEventThrottle={16}
              scrollEnabled={false}
              decelerationRate="fast"
              showsHorizontalScrollIndicator={false}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false },
              )}>



              <View style={[styles.cardTab]}>
                <View style={{ ...GlobalStyleSheet.container, paddingTop: 0 }}>
                  {minerData.length > 0 ? (
                    minerData.slice(-1).map((data, index) => (
                      <View
                        key={index}
                        style={{
                          borderWidth: 1,
                          borderColor: colors.borderColor,
                          backgroundColor: colors.background,
                          paddingHorizontal: 15,
                          paddingVertical: 14,
                          borderRadius: SIZES.radiusLg,
                          marginBottom: 8,
                        }}
                      >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>

                        
                          <Image
                            style={{
                              height: 27,
                              width: 27,
                            }}
                            source={IMAGES.miner}
                          />
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Text style={{ ...FONTS.font, color: colors.text, fontSize: 13 }}>Miner type</Text>
                          <Text style={{ ...FONTS.fontSm, ...FONTS.fontMedium, color: colors.title }}>{data.miner_type}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Text style={{ ...FONTS.font, color: colors.text, fontSize: 13 }}>AGX per month</Text>
                          <Text style={{ ...FONTS.fontSm, ...FONTS.fontMedium, color: colors.title, fontSize: 13 }}>{agxAmount.toFixed(2)} AGX ~ {usdAmount.toFixed(2)} USD</Text>
                        </View>


                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Text style={{ ...FONTS.font, color: colors.text, fontSize: 13 }}>Status</Text>
                          <Text style={{ ...FONTS.fontSm, ...FONTS.fontBold, color: COLORS.success, fontSize: 13 }}>ACTIVE</Text>
                        </View>
                      </View>
                    ))
                  ) : (
                    <View style={{
                      borderWidth: 1,
                      borderColor: colors.borderColor,
                      backgroundColor: colors.background,
                      paddingHorizontal: 15,
                      paddingVertical: 14,
                      borderRadius: SIZES.radiusLg,
                      marginBottom: 8,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Text style={{ ...FONTS.font, color: colors.text }}>No active Miner</Text>
                    </View>
                  )}
                </View>
              </View>




            </ScrollView>
          </ScrollView>


        </View>

      </SafeAreaView>
    </>
  );
};






const styles = StyleSheet.create({

  btnContainer: {
    height: 45,
    //overflow: 'hidden',
    flexDirection: 'row',
    width: '100%',
    borderRadius: 30,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedBtnContainer: {
    height: 45,
    flexDirection: 'row',
    position: 'absolute',
    borderRadius: 30,
    overflow: 'hidden',
  },
  animatedBtn: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    width: width,
  },
  inputBox: {
    borderRadius: SIZES.radius,
    width: SIZES.width > SIZES.container ? SIZES.width - 110 : SIZES.width - 110,
    height: 45,
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputBoxInner: {
    position: 'absolute',
    zIndex: -1,
  },
  listItem: {
    flexDirection: 'row',
    marginHorizontal: 15,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: SIZES.radiusLg,
    marginBottom: 8,
    paddingHorizontal: 14,
  },

  modalContainer: {
    backgroundColor: 'rgba(0,0,0,.4)',
    flex: 1,
    justifyContent: 'center',
    padding: 15,
  },

  swipeBtn: {
    backgroundColor: 'rgba(255,255,255,.1)',
    height: 40,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginRight: 5,
  },

  scrollView: {
    paddingLeft: SIZES.width > SIZES.container ? (SIZES.container - itemWidth) / 2 : (SIZES.width - itemWidth) / 2,
    paddingRight: SIZES.width > SIZES.container ? ((SIZES.width - itemWidth) / 2) - 10 : ((SIZES.width - itemWidth) / 2) - 10,
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 20,
  },

  tabBtn: {
    height: 48,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  btnTabSmall: {
    height: 30,
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  inputActive: {
    borderColor: COLORS.primary,
  },
  inputLabelRight: {
    ...FONTS.font,
    position: 'absolute',
    ...FONTS.fontMedium,
    right: 15,
    top: 12,
  },
  btnContainer: {
    height: 45,
    //overflow: 'hidden',
    flexDirection: 'row',
    width: '100%',
    borderRadius: 30,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedBtnContainer: {
    height: 45,
    flexDirection: 'row',
    position: 'absolute',
    overflow: 'hidden',
    borderRadius: 30,
  },
  animatedBtn: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cardTab: {
    width: width,
  },
  bglayer: {
    position: 'absolute',
    height: '100%',
    zIndex: -1,
  },

  CardData: {
    icon: {
      tintColor: "#fff",
    },
  }

})


export default HomeScreen;
