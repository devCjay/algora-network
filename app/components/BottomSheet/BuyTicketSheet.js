import React, { useState, useRef, useEffect } from "react";
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
import { purchaseTicket } from "../../Api/raffleApi";
import Toast from "react-native-toast-message";
import DrawerNavigation from "../../Navigations/DrawerNavigation";
import { DeviceEventEmitter } from 'react-native';
import DepositSheet from "../../components/BottomSheet/DepositSheet";
import RBSheet from "react-native-raw-bottom-sheet";

const BuyTicketSheet = () => {
    
 const [isFocused, setisFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [numTickets, setNumTickets] = useState(1);
  const ticketPrice = 2; // Assuming the ticket price is 2 USDT
  const [refreshKey, setRefreshKey] = useState(0); // Add a refresh key state
  const totalTicket = numTickets * ticketPrice;
  const { username, usdbalance } = useUserData(); // Fetch user data
  const navigation = useNavigation();
  const { colors } = useTheme();
    const refRBSheet = useRef();
     const [walletRBSheet, setWalletRBSheet] = useState('deposit');
  
  const handlePurchase = async () => {
    if (numTickets <= 0) {
    
      Toast.show({
        type: "error",
        text1: "invalid!",
        text2: "Please enter a valid number of tickets.",
      });

      return;
    }

    if (usdbalance < totalTicket) {
     
      Toast.show({
        type: "error",
        text1: "Insufficient balance!",
        text2: "Please top up your account.",
      });

      return;
    }

    setLoading(true);

    try {
      const raffleId = await AsyncStorage.getItem("ticketId"); // Fetch the raffle ID from AsyncStorage
      if (!raffleId) {
        Alert.alert("Error", "No raffle ID found.");
        setLoading(false);
        return;
      }

      const result = await purchaseTicket(JSON.parse(raffleId), totalTicket); // Call the API
      if (result.success) {
     
          Toast.show({
          type: "success",
          text1: "Congratulations!",
          text2: "Tickets purchased successfully!",
      });

        DeviceEventEmitter.emit('refreshTicketDetails'); // Emit an event

        navigation.navigate('DrawerNavigation'); // Redirect to home  page
      } else {

        Toast.show({
          type: "error",
          text1: "Failed to purchase tickets.",
          text2: "Please, Try again Later.",
        });
  
      }
    } catch (error) {
   
         Toast.show({
        type: "error",
        text1: "Error.",
        text2: "An unexpected error occurred. Please try again.",
      });

    } finally {
      setLoading(false);
    }
  };




  return (
    <>
    <SafeAreaView style={{flex:1,backgroundColor:colors.background}}>

    <RBSheet
                        ref={refRBSheet}
                        closeOnDragDown={true}
                        height={580}
                        openDuration={300}
                        customStyles={{
                            wrapper: {
                              backgroundColor: 'rgba(0,0,0,.6)',
                            },
                            container:{
                                backgroundColor: colors.bgLight,
                                paddingTop:15
                            },
                            draggableIcon: {
                                width:85,
                                height:6,
                                backgroundColor:colors.text,
                                opacity:.3,
                            }
                        }}
                      >
                        <DepositSheet />
                        
                      </RBSheet>
        
        <View
            style={{
                flex:1,
                backgroundColor:colors.ThemeBg,
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
                        
                        <Button
                          mode="contained" // Makes the button filled
                          onPress={()=> { setWalletRBSheet('deposit');refRBSheet.current.open()}}
                          style={{
                          backgroundColor: COLORS.danger, // Set the background color
                          borderRadius: 5, // Rounded corners
                          paddingVertical: 0, // Vertical padding
                          paddingHorizontal: 0, // Horizontal padding
                          marginTop: 10, // Add spacing above the button
                        }}
                        labelStyle={{
                        color: COLORS.white, // Text color
                        fontSize: 12, // Font size
                        fontWeight: 'bold', // Bold text
                        }}
                        >
                          Top Up Now
                        </Button>
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
                  const parsedValue = text.replace(/[^0-9]/g, ""); // Allow only numeric input
                  setNumTickets(parsedValue ? parseInt(parsedValue) : ""); // Update the state
                }}
                keyboardType="numeric" // Set the keyboard type to numeric
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
                <CustomButton title="Confirm Purchase" onPress={handlePurchase} disabled={loading} />
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


export default BuyTicketSheet;
