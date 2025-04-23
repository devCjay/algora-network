import React, { useState } from "react";
import { 
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useTheme } from '@react-navigation/native';
import Header from "../../layout/header";
import { COLORS, FONTS, ICONS, IMAGES, SIZES } from "../../Utils/theme";
import { GlobalStyleSheet } from "../../Utils/styleSheet";
import CustomButton from "../../components/CustomButton";
import { SvgXml } from "react-native-svg";
import Divider from '../../components/Dividers/Divider';
import { createOrder } from "../../Api/orderApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";
import { useUserData } from "../../Api/userApi";


const CoinItem = [
    {
        icon : IMAGES.bitcoin,
        coin : 'Bitcoin',
        sortName : 'BTC',
        currency : 'btc',
    },
    {
        icon : IMAGES.etherium,
        coin : 'Etherium',
        sortName : 'ETH',
        currency : 'eth',
    },

    {
        icon : IMAGES.etherium,
        coin : 'Etherium Base',
        sortName : 'ETHBASE',
        currency : 'ethbase',
    },

    {
        icon : IMAGES.doge,
        coin : 'Dogecoin',
        sortName : 'DOGE',
        currency : 'doge',
    },

    {
        icon : IMAGES.monero,
        coin : 'Monero',
        sortName : 'XMR',
        currency : 'xmr',
    },

    {
        icon : IMAGES.solana,
        coin : 'Solana',
        sortName : 'SOL',
        currency : 'sol',
    },

    {
        icon : IMAGES.usdt,
        coin : 'USDTTRON',
        sortName : 'USDTTRC20',
        currency : 'usdttrc20',
    },

    {
        icon : IMAGES.usdt,
        coin : 'Tether BSC',
        sortName : 'USDTBSC',
        currency : 'usdtbsc',
    },

    {
        icon : IMAGES.bnb,
        coin : 'Binance Coin',
        sortName : 'BNBBSC',
        currency : 'bnbbsc',
    },

    {
        icon : IMAGES.tron,
        coin : 'Tron',
        sortName : 'TRX',
        currency : 'trx',
    },
    
    
];


const WithdrawSheet = () => {
    
    const [isFocused2 , setisFocused2] = useState(false);
    const [modalVisible , setModalVisible] = useState(false);
    const [modalVisible2 , setModalVisible2] = useState(false);

    const [ItemValue , setItemValue] = useState('Select Coin');
    const [ItemValue2 , setItemValue2] = useState('Select Miner');

    const [isFocused , setisFocused] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    // Purchase ticket

    
    const { username, usdbalance } = useUserData();
    console.log(username, usdbalance);

    const ticketPrice = 2; // Assuming the ticket price is 2 USDT
    const [numTickets, setNumTickets] = useState(0);
    const totalTicket = numTickets * ticketPrice;












    const handleSubmit = async () => {
        setLoading(true);
        const result = await createOrder(id, numMonths, currency);
        setLoading(false);

      if (result.success) {
         Alert.alert("Success", "Order Created Successfully!");
         await AsyncStorage.setItem("newOrder", JSON.stringify(result.data));
         navigation.replace("TwoFASettings"); // Navigate to home after login

        console.log("Order Created:", result.data);



      } else {
        Alert.alert("Error", result.error);
        console.error("Order Creation Failed:", result.error);
      }

    }


    const { colors } = useTheme();


  return (
    <>
    <SafeAreaView style={{flex:1,backgroundColor:colors.background}}>
        
        <View
            style={{
                flex:1,
            }}

        >

         
                 
                    <ScrollView contentContainerStyle={{flexGrow:1}}>
                
               
                <View style={{...GlobalStyleSheet.container,flex:1}}>
                    <View
                        style={{
                            paddingHorizontal:20,
                            paddingVertical:20,
                           // backgroundColor:colors.bgLight,
                            borderRadius:SIZES.radius,
                            borderWidth:1,
                            borderColor:colors.borderColor,
                        }}
                    >

                        <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:15}}>
                            <Text style={{...FONTS.h5,color:colors.text}}>Buy Ticket</Text>
                        </View> 
                        
                        <Divider />



                        {usdbalance < totalTicket && (
                        <View style={{ alignItems: 'center', paddingHorizontal: 15, paddingTop: 15, paddingBottom: 30 }}>
                        <Text style={{ ...FONTS.h2, color: COLORS.danger }}> {usdbalance} USD</Text>
                        <Text style={{ ...FONTS.font, color: COLORS.danger, textAlign: "center" }}>
                        Insufficient balance. You need 2 USDT to buy 1 ticket.
                        </Text>
                        <Button onPress={() => navigation.navigate('Deposit')}>Top Up Now</Button>
                        </View>
)}


                <View style={{flexDirection:'row',flex:1, marginBottom:10}}>
                        <Text style={{...FONTS.font,color:colors.title}}>Number of Tickets </Text>
                    </View>


                <View style={{marginBottom:15}}>
                   

                <TextInput
    style={[{
        ...GlobalStyleSheet.formControl,
        ...FONTS.fontMedium,
        backgroundColor: colors.inputBg,
        color: colors.title,
        borderColor: colors.borderColor,
        paddingRight: 95,
    }, isFocused && styles.inputActive]}
    onFocus={() => setisFocused(true)}
    onBlur={() => setisFocused(false)}
    value={numTickets.toString()} // Use `value` instead of `defaultValue`
    onChangeText={(text) => {
        const parsedValue = parseInt(text) || 0; // Parse the input as an integer, default to 0 if invalid
        setNumTickets(parsedValue); // Update the state
    }}
    placeholderTextColor={colors.text}
    placeholder="1"
/>

                    <View
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            position:'absolute',
                            right:5,
                            top:10,
                        }}
                    >
                       <View
                            style={{
                                height:20,
                                justifyContent:'center',
                                paddingHorizontal:18,
                                borderRadius:4,
                                marginLeft:6,
                            }}
                        >
                            <Text style={{...FONTS.fontBold,color:COLORS.white}}>{totalTicket} USD</Text>
                        </View>
                       
                    </View>
                </View>
                
                               
                



            </View>
        

                </View>
                <View style={GlobalStyleSheet.container}>
                    {loading ? (
                                <View style={styles.buttonContainer}>
                                  <ActivityIndicator size="small" color="#fff" />
                                  <Text style={styles.loadingButtonText}>Processing...</Text>
                                </View>
                              ) : (
                                <CustomButton title="Confirm Purchase" onPress={handleSubmit} disabled={loading} />
                              )}
                </View>
            </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};





const styles = StyleSheet.create({

    btn:{
        height:35,
        borderRadius:4,
        borderWidth:1,
        borderColor:'transparent',
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:15,
    },
    inputActive:{
        borderColor:COLORS.primary,
    },

    selectBtn:{
        borderRadius:SIZES.radius,
        height: 48,
        borderWidth:1,
        borderColor:'transparent',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:12
    },
    modalContainer:{
        flex:1,
    },
    inputActive:{
        borderColor:COLORS.primary,
    },

    container: {
        flexDirection: "row",  // Align label & input in one row
        alignItems: "center",   // Vertically align them
        justifyContent: "space-between",
        padding: 10,
      },
      label: {
        color: "#A0A0A0", 
        fontSize: 16,
        marginBottom: 8,
       
      },
      inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 8,
        overflow: "hidden",
      
        
      },
      button: {
        backgroundColor: "#222",
        padding: 10,
        width: 40,
        alignItems: "center",
        justifyContent: "center",
      },
      buttonText: {
        color: "#FFF",
        fontSize: 18,
      },
      input: {
        flex: 1,
        textAlign: "center",
        color: "#FFF",
        fontSize: 18,
        paddingVertical: 10,
        backgroundColor: "#121212",
      },
      oadingContainer: {
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


export default WithdrawSheet;
