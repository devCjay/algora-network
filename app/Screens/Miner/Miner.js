import React, { useState, useRef } from "react";
import {
  ImageBackground,
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
  SafeAreaView,
  Platform,
  RefreshControl,
} from "react-native";
import { useTheme } from '@react-navigation/native';
import Header from "../../layout/header";
import { COLORS, FONTS, IMAGES, SIZES } from "../../Utils/theme";
import { useNavigation } from '@react-navigation/native';

import { VictoryPie } from "victory-native";

import { GlobalStyleSheet } from "../../Utils/styleSheet";
import { useListUserMiner } from "../../Api/minerApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRate } from "../../Api/userApi";

const { width } = Dimensions.get('window');
const itemWidth = SIZES.width > SIZES.container ? (SIZES.container / 1.5) : (SIZES.width / 1.5) + 50;


const ListData = [
  {
    id: "1",
    icon: IMAGES.miner,
    coin: "Machine Miner",
    amount: "1314.00 AGX ~ 9.86 USD",
    subTitle: '02-08-2025',
    rate: "Active",
  }

]



const MinerScreen = () => {

  const { colors } = useTheme();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh


  // Fetch User Miner 

  const { minerData } = useListUserMiner();

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

  const { cminer, cminerAmount } = useRate();
  const agxAmount = cminerAmount / cminer * 60 * 24 * 31;
  const usdAmount = agxAmount * 0.0075;


  // Save state
  const handleItemPress = async (dataId) => {
    try {
      await AsyncStorage.setItem('minerId', dataId);
      navigation.navigate('ExtendOrder', { dataId });
    } catch (e) {
      // error handling
    }

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



  return (
    <>
      <SafeAreaView style={{ padding: 0, flex: 1 }}>

        <ScrollView
          contentContainerStyle={{ paddingBottom: 80, flexGrow: 1 }}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.primary]} // Customize spinner color
            />
          }
        >
          <View style={[GlobalStyleSheet.container, { paddingHorizontal: -15, paddingTop: 0 }]}>


            <Header leftIcon="back" title="Algora Network Statistics" />


            <ImageBackground
              source={IMAGES.bg}
              style={[{
                padding: 0,
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                paddingBottom: 45,
              }]}
            >

              <View
                style={{
                  top: 4,
                  position: 'absolute',
                }}
              >
                <VictoryPie
                  width={500}
                  height={394}
                  cornerRadius={10}
                  innerRadius={137}
                  startAngle={90}
                  endAngle={-90}
                  padAngle={3}
                  labels={({ datum }) => ``}
                  colorScale={["#BB85FF", "#09B6C1"]}
                  data={[
                    { x: "Profit", y: 0 },
                    { x: "Loss", y: 100 }
                  ]}
                />
              </View>

              <View style={{ paddingTop: 70, alignItems: 'center', height: 230, justifyContent: 'center' }}>
                <Text style={{ ...FONTS.font, color: COLORS.white, marginBottom: 6, opacity: .8 }}>Active Miners</Text>
                <Text style={{ ...FONTS.h2, color: COLORS.white, marginBottom: 4 }}>241166</Text>

              </View>
            </ImageBackground>
          </View>
          <View
            style={[GlobalStyleSheet.container, {
              padding: 0,
              flexDirection: 'row',
              marginHorizontal: 10,
              marginTop: -45,
              zIndex: 2,
            }]}
          >
            <TouchableOpacity
              activeOpacity={.95}
              style={[{
                backgroundColor: colors.background,
                borderRadius: SIZES.radiusLg,
                borderWidth: 2,
                alignItems: 'center',
                borderColor: COLORS.mycolor2,
                padding: 15,
                marginHorizontal: 5,
                flex: 1,
                shadowColor: "rgba(0,0,0,.5)",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.30,
                shadowRadius: 4.65,

                elevation: 8,
              }]}
            >
              <View
                style={{
                  height: 45,
                  width: 45,
                  backgroundColor: '#09B6C1',
                  borderRadius: 45,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: -35,
                  marginBottom: 12,
                }}
              >
                <Image
                  style={{
                    height: 22,
                    width: 22,
                    tintColor: COLORS.white,
                  }}
                  source={IMAGES.pay}
                />
              </View>
              <Text style={{ ...FONTS.fontLg, ...FONTS.fontMedium, color: colors.title }}>100%</Text>
              <Text style={{ ...FONTS.fontSm, color: colors.text }}>Global Pool</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={.95}
              style={[{
                backgroundColor: colors.background,
                borderRadius: SIZES.radiusLg,
                padding: 15,
                marginHorizontal: 5,
                borderWidth: 2,
                alignItems: 'center',
                borderColor: COLORS.mycolor2,
                flex: 1,
                shadowColor: "rgba(0,0,0,.5)",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.30,
                shadowRadius: 4.65,

                elevation: 8,
              }]}
            >
              <View
                style={{
                  height: 45,
                  width: 45,
                  backgroundColor: COLORS.mycolor2,
                  borderRadius: 45,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: -35,
                  marginBottom: 12,
                }}
              >
                <Image
                  style={{
                    height: 22,
                    width: 22,
                    tintColor: COLORS.white,
                  }}
                  source={IMAGES.get}
                />
              </View>
              <Text style={{ ...FONTS.fontLg, ...FONTS.fontMedium, color: colors.title }}>0%</Text>
              <Text style={{ ...FONTS.fontSm, color: colors.text }}>My share</Text>
            </TouchableOpacity>
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

          <ScrollView

            horizontal
            pagingEnabled
            scrollEventThrottle={16}
            scrollEnabled={false}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
          >



            <View style={[styles.cardTab]}>
              <View style={{ ...GlobalStyleSheet.container, paddingTop: 0 }}>
                {minerData.length > 0 ? (
                  minerData.map((data, index) => (
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
      </SafeAreaView>
    </>
  );
};



const styles = StyleSheet.create({
  swipeBtn: {
    backgroundColor: 'rgba(255,255,255,.1)',
    height: 40,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginRight: 5,
  },
  btnContainer: {
    height: 45,
    //overflow: 'hidden',
    flexDirection: 'row',
    width: '100%',
  },
  btnSwipe: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedBtnContainer: {
    height: 45,
    flexDirection: 'row',
    position: 'absolute',
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
  walletBtn: {
    height: 45,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    marginHorizontal: 3,
  },
  walletBtnIcon: {
    tintColor: COLORS.white,
    height: 18,
    width: 18,
    marginRight: 5,
  },
  card2: {
    borderWidth: 1,
    borderRadius: SIZES.radius,
    marginHorizontal: 3,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    shadowColor: "rgba(0,0,0,.4)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,

    elevation: 8,
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


export default MinerScreen;
