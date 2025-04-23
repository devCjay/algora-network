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
import { fundAccount } from "../../Api/userApi";
import Toast from "react-native-toast-message";
import * as Haptics from "expo-haptics";


const CoinItem = [
    {
        id : 1,
        icon : IMAGES.bitcoin,
        coin : 'Bitcoin',
        sortName : 'BTC',
        currency : 'btc',
        min: 12,
    },
    {
        id : 2,
        icon : IMAGES.etherium,
        coin : 'Etherium',
        sortName : 'ETH',
        currency : 'eth',
        min: 5,
    },

    {
        id : 3,
        icon : IMAGES.etherium,
        coin : 'Etherium Base',
        sortName : 'ETHBASE',
        currency : 'ethbase',
        min: 2,
    },

    {
        id : 4,
        icon : IMAGES.doge,
        coin : 'Dogecoin',
        sortName : 'DOGE',
        currency : 'doge',
        min: 5,
    },

    {
        id : 5,
        icon : IMAGES.monero,
        coin : 'Monero',
        sortName : 'XMR',
        currency : 'xmr',
        min: 5,
    },

    {
        id : 6,
        icon : IMAGES.solana,
        coin : 'Solana',
        sortName : 'SOL',
        currency : 'sol',
        min: 2,
    },

    {
        id : 7,
        icon : IMAGES.usdt,
        coin : 'USDTTRON',
        sortName : 'USDTTRC20',
        currency : 'usdttrc20',
        min: 10,    
    },

    {
        id : 8,
        icon : IMAGES.usdt,
        coin : 'Tether BSC',
        sortName : 'USDTBSC',
        currency : 'usdtbsc',
        min: 5,
    },

    {
        id : 9,
        icon : IMAGES.bnb,
        coin : 'Binance Coin',
        sortName : 'BNBBSC',
        currency : 'bnbbsc',
        min: 5,
    },

    {
        id : 10,
        icon : IMAGES.tron,
        coin : 'Tron',
        sortName : 'TRX',
        currency : 'trx',
        min: 5,
    },
    
    
];


const DepositSheet = () => {
    
    const [isFocused2, setisFocused2] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [ItemValue, setItemValue] = useState("Select Coin");
    const [currency, setCurrency] = useState(""); // State to store selected currency
    const [amount, setAmount] = useState(""); // State to store entered amount
    const [minAmount, setMinAmount] = useState(0); // State to store minimum amount
    const [isFocused, setisFocused] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
  

    const handleFundAccount = async () => {
        if (!currency) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Please select a cryptocurrency.",
          });

          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          return;
        }
      
        if (!amount || parseFloat(amount) <= 0) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Please enter a valid amount.",
          });
          return;
        }

        if (parseFloat(amount) < minAmount) {
          Toast.show({
            type: "error", 
            text1: "Minimum Amount",
            text2: `Minimum deposit amount is ${minAmount} USD.`,
            }); 
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        return;
        }
        setLoading(true);
      
        try {
          const result = await fundAccount(currency, parseFloat(amount)); // Call the API
          if (result.success) {
            // Store the result in AsyncStorage as `newDeposit`
            await AsyncStorage.setItem("newDeposit", JSON.stringify(result.data));
            //console.log("Stored newDeposit in AsyncStorage:", result.data);
      
            Toast.show({
              type: "success",
              text1: "Wallet Generated Successfully",
              text2: "Make payment to fund your wallet.",
            });
      
            navigation.replace("FundAccount"); // Navigate to payment page
          } else {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: result.error || "Please select a payment method.",
            });

             Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          }
        } catch (error) {
         // console.error("Error funding wallet:", error);
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "An unexpected error occurred. Please try again.",
          });
        } finally {
          setLoading(false);
        }
      };
      const { colors } = useTheme();

      

  return (
    <>
    <SafeAreaView style={{flex:1,backgroundColor:colors.background}}>
        
        <View
            style={{
                flex:1,
            }}

        >

           {/*  Payment Modal */}

                <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                        >
                            <View
                                style={[GlobalStyleSheet.container,styles.modalContainer,{padding:0, backgroundColor:colors.background}]}
                            >
                                <View
                                    style={{
                                        height:55,
                                        backgroundColor:COLORS.primary,
                                        flexDirection:'row',
                                        alignItems:'center',
                                        paddingHorizontal:20,
                                    }}
                                >
                                    <TouchableOpacity style={{marginRight:10}}>
                                    <Image
                                        style={{
                                        height:20,
                                        width:20,
                                        }}
                                        source={IMAGES.search}
                                    />
                                    </TouchableOpacity>
                                    <TextInput
                                        style={{
                                            ...FONTS.fontLg,
                                            color:COLORS.white,
                                            flex:1,
                                            top:1,
                                        }}
                                        placeholder="Search Here"
                                        placeholderTextColor={'rgba(255,255,255,.8)'}
                                    />
                                    <TouchableOpacity
                                        onPress={()=> setModalVisible(false)}
                                        style={{height:50,width:50,marginRight:-10,alignItems:'center',justifyContent:'center'}}
                                    >   
                                        <SvgXml
                                            stroke={COLORS.white}
                                            xml={ICONS.close}
                                        />
                                    </TouchableOpacity>
                            </View>
                                
                                <ScrollView contentContainerStyle={{paddingTop:10}}>
                                    {CoinItem.map((data,index) => (
                                        <TouchableOpacity 
                                        onPress={() => {
                                            setItemValue(data.coin); // Set selected coin
                                            setCurrency(data.currency); 
                                            setMinAmount(data.min)       // Set ID dynamically
                                            setModalVisible(false);  // Close modal
                                          }}

                                            key={index}
                                            style={[{
                                                flexDirection:'row',
                                                alignItems:'center',
                                                marginHorizontal:15,
                                                paddingVertical:10,
                                                borderBottomWidth:1,
                                                borderColor:colors.borderColor,
                                            },ItemValue === data.coin && {
                                                borderWidth:1,
                                                borderColor:COLORS.primary,
                                                backgroundColor:colors.bgLight,
                                                marginHorizontal:5,
                                                paddingHorizontal:10,
                                                borderRadius:SIZES.radiusLg,
                                            }]}
                                        >
                                            <Image
                                                style={{
                                                    height:35,
                                                    width:35,
                                                    marginRight:10,
                                                }}
                                                source={data.icon}
                                            />
                                            <Text style={{...FONTS.h6,color:colors.title,flex:1}}>{data.coin}</Text>
                                            <Text style={{...FONTS.fontSm,color:colors.title}}>{data.sortName}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        </Modal>
            

                 
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
                            <Text style={{...FONTS.h5,color:colors.text}}>Fund Wallet</Text>
                        </View> 
                        
                        <Divider />






                             <View style={{marginBottom:15}}>
                            
                                                    <View style={{flexDirection:'row',flex:1, marginBottom:10}}>
                                                        <Text style={{...FONTS.font,color:colors.title}}>Select Cryptocurrency: </Text>
                                                    </View>
                            
                                                <TouchableOpacity
                                                    onPress={()=> setModalVisible(true)}
                                                    style={{
                                                        ...styles.selectBtn,
                                                        backgroundColor:colors.inputBg,
                                                        borderColor:colors.borderColor,
                                                    }}
                                                >
                                                    <Text style={[{...FONTS.fontLg,color:colors.title}]}>{ItemValue}</Text>
                                                    <SvgXml
                                                        height={18}
                                                        width={18}
                                                        fill={colors.title}
                                                        xml={ICONS.down}
                                                    />
                                                </TouchableOpacity>
                              </View>



                <View style={{marginBottom:15}}>
                    <TextInput
                        style={[{
                            ...GlobalStyleSheet.formControl,
                            ...FONTS.fontMedium,
                            backgroundColor:colors.inputBg,
                            color:colors.title,
                            borderColor:colors.borderColor,
                            paddingRight:95,
                        },isFocused && styles.inputActive]}
                        onFocus={() => setisFocused(true)}
                        onBlur={() => setisFocused(false)}
                        value={amount}

                        onChangeText={(text) => setAmount(text)}

                        placeholderTextColor={colors.text}
                        placeholder={`Min: ${minAmount}`} // Dynamic placeholder
                        keyboardType="numeric"
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
                            <Text style={{...FONTS.fontBold,color:COLORS.white}}>$</Text>
                        </View>
                       
                    </View>




                        {amount < minAmount && (
                        <View style={{ alignItems: 'center', paddingHorizontal: 15, paddingTop: 15, paddingBottom: 10 }}>
                        
                        <Text style={{ ...FONTS.font, color: COLORS.danger, textAlign: "center" }}>
                            Minimum deposit amount is {minAmount} USD.
                        </Text>
                        
                        </View>
                        )}



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
                                <CustomButton title="Generate Wallet" onPress={handleFundAccount} disabled={loading} />
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


export default DepositSheet;
