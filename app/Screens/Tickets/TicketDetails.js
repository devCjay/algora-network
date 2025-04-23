import React, { useRef, useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { GlobalStyleSheet } from '../../Utils/styleSheet';
import { COLORS, FONTS, IMAGES, SIZES } from '../../Utils/theme';

import Header from '../../layout/header';
import PricingStyle1 from '../../components/Pricing/PricingStyle1';
import PricingStyle2 from '../../components/Pricing/PricingStyle2';
import PricingStyle3 from '../../components/Pricing/PricingStyle3';
import { useNavigation, useTheme } from '@react-navigation/native';
import Tickets from './Tickets';
import PortfolioCard from '../../components/PortfolioCard';
import BalanceChart from '../../components/chart/BalanceChart';
import Cards from '../../components/Tickets/Cards';
import CustomButton from '../../components/CustomButton';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import { LinearGradient } from 'expo-linear-gradient';

import RBSheet from "react-native-raw-bottom-sheet";
import Ripple from "react-native-material-ripple";
import TransferSheet from "../../components/BottomSheet/TransferSheet";
import DepositSheet from "../../components/BottomSheet/DepositSheet";
import WithdrawSheet from "../../components/BottomSheet/WithdrawSheet";
import BuyTicketSheet from '../../components/BottomSheet/BuyTicketSheet';

import WalletConvert from "../../components/BottomSheet/WalletConvert";
import Animated from 'react-native-reanimated';
import { getRaffleStats, getMyTickets } from '../../Api/raffleApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DeviceEventEmitter } from 'react-native';


const TicketDetailScreen = () => {

  const { colors } = useTheme();

  const refRBSheet = useRef();
  const [walletRBSheet, setWalletRBSheet] = useState('buyticket');
  const [raffleStats, setRaffleStats] = useState(null); // State to store raffle stats
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true); // State to manage loading
  const [myTickets, setMyTickets] = useState([]); // State to store user's tickets


  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener('refreshTicketDetails', () => {
      setRefreshKey((prevKey) => prevKey + 1); // Trigger refresh
    });

    return () => subscription.remove(); // Cleanup on unmount
  }, []);


  // Fetch Raffle Stats and My Tickets using ticketId from AsyncStorage
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ticketId = await AsyncStorage.getItem("ticketId"); // Fetch ticketId from AsyncStorage
        //console.log("Retrieved ticketId:", ticketId); // Log the ticketId
        if (!ticketId) {
          //console.error("No ticketId found in AsyncStorage");
          setLoading(false);
          return;
        }

        // Fetch Raffle Stats
        const raffleStatsResult = await getRaffleStats(JSON.parse(ticketId));
        if (raffleStatsResult.success) {
          setRaffleStats(raffleStatsResult.data); // Store the fetched stats
        } else {
          // console.error("Error fetching raffle stats:", raffleStatsResult.error);
        }

        // Fetch My Tickets
        const myTicketsResult = await getMyTickets(JSON.parse(ticketId));
        if (myTicketsResult.success) {
          setMyTickets(myTicketsResult.data); // Store the fetched tickets
        } else {
          // console.error("Error fetching my tickets:", myTicketsResult.error);
        }

        setLoading(false);
      } catch (error) {
        //console.error("Error fetching ticketId, raffle stats, or my tickets:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //console.log("Raffle Stats:", raffleStats); // Log the fetched raffle stats
  //console.log("My Tickets:", myTickets); // Log the fetched tickets

  const CardData = [
    {
      id: '1',
      icon: IMAGES.star,
      title: 'Total Tickets',
      amount: raffleStats?.total_tickets || '0', // Use fetched data
    },
    {
      id: '2',
      icon: IMAGES.referral,
      title: 'Participants',
      amount: raffleStats?.total_participants || '0', // Use fetched data
    },
    {
      id: '3',
      icon: IMAGES.pay,
      title: 'Your Tickets',
      amount: myTickets.length || '0', // Use fetched data
    },
  ];



  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgColor }}>

        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          height={

            walletRBSheet === 'buyticket' ? 580 :
              walletRBSheet === 'deposit' ? 400 : 480

          }
          openDuration={300}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0,0,0,.6)',
            },
            container: {
              backgroundColor: colors.bgLight,
              paddingTop: 15
            },
            draggableIcon: {
              width: 85,
              height: 6,
              backgroundColor: colors.text,
              opacity: .3,
            }
          }}
        >
          {


            (walletRBSheet === 'buyticket') ? <BuyTicketSheet /> :
              (walletRBSheet === 'deposit') ? <DepositSheet /> :
                <></>
          }

        </RBSheet>

        <Header title={'Raffles'} titleLeft leftIcon={'back'} />
        <ScrollView>
          <View style={{ ...GlobalStyleSheet.container, alignItems: 'center', paddingVertical: 30 }}>


            <Cards />


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


            <View style={[GlobalStyleSheet.container, {
              padding: 0,
              marginHorizontal: 15,
              flexDirection: 'row',
              marginBottom: 12,
              marginTop: 0,
            }]}>


              <TouchableOpacity
                onPress={() => { setWalletRBSheet('buyticket'), refRBSheet.current.open() }}
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

                <Text style={{ ...FONTS.h6, color: COLORS.white }}>Buy Ticket</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => { setWalletRBSheet('deposit'); refRBSheet.current.open() }}
                style={{
                  backgroundColor: COLORS.mycolor2,
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


                <Text style={{ ...FONTS.h6, color: COLORS.white }}>Fund Account</Text>
              </TouchableOpacity>


            </View>




          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};



const ListItem = ({ icon, coin, rate, amount, subTitle, navigate, bottomSheet, sheet }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const renderLeftActions = (progress, dragX) => {

    return (
      <Animated.View style={[
        {
          flexDirection: 'row',
          opacity: 1,
          left: -260,
          marginBottom: 8,
          transform: [
            {
              translateX: dragX,
            }
          ]
        },
      ]}>
        <LinearGradient
          start={{ x: 0, y: 1 }} end={{ x: 1, y: 0.5 }}
          colors={['#6F4FEF', '#4628FF']}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            borderTopRightRadius: SIZES.radius,
            borderBottomRightRadius: SIZES.radius,
          }}
        >
          <Ripple
            onPress={() => navigation.navigate('Deposit')}
            style={styles.swipeBtn}
          >
            <Text style={{ ...FONTS.font, color: COLORS.white, ...FONTS.fontMedium }}>Deposit</Text>
          </Ripple>
          <Ripple
            onPress={() => navigation.navigate('Withdraw')}
            style={styles.swipeBtn}
          >
            <Text style={{ ...FONTS.font, color: COLORS.white, ...FONTS.fontMedium }}>Withdraw</Text>
          </Ripple>
          <Ripple
            onPress={() => { sheet('transfer'); bottomSheet.current.open() }}
            style={styles.swipeBtn}
          >
            <Text style={{ ...FONTS.font, color: COLORS.white, ...FONTS.fontMedium }}>Transfer</Text>
          </Ripple>
        </LinearGradient>
      </Animated.View>
    );
  };


  return (
    <Swipeable renderLeftActions={renderLeftActions}>
      <View
        style={{ ...styles.listItem, borderColor: colors.borderColor, backgroundColor: colors.bgLight }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Image
            style={{
              height: 35,
              width: 35,
              marginRight: 10,
              resizeMode: 'contain',
            }}
            source={icon} />
          <View>
            <Text style={{ ...FONTS.h6, color: colors.title, marginBottom: 4 }}>{coin}</Text>
            <Text style={{ ...FONTS.fontSm, color: colors.text }}>{subTitle}</Text>
          </View>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ ...FONTS.h6, color: colors.title, marginBottom: 2 }}>{amount}</Text>
          <Text style={{ ...FONTS.fontSm, color: COLORS.success }}>{rate}</Text>
        </View>
      </View>
    </Swipeable>
  )
}



const styles = StyleSheet.create({

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 5,
    opacity: 0.7,
  },
  loadingButtonText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 16,
  },

})


export default TicketDetailScreen;