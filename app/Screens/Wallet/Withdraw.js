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
import NumberInput from "../../components/Input/NumberInput";
import Divider from '../../components/Dividers/Divider';
import { useListMiner } from "../../Api/minerApi";
import { createOrder } from "../../Api/orderApi";
import AsyncStorage from "@react-native-async-storage/async-storage";


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


const WithdrawScreen = () => {
    
    const [isFocused2 , setisFocused2] = useState(false);
    const [modalVisible , setModalVisible] = useState(false);
    const [modalVisible2 , setModalVisible2] = useState(false);

    const [ItemValue , setItemValue] = useState('Select Coin');
    const [ItemValue2 , setItemValue2] = useState('Select Miner');

    const [isFocused , setisFocused] = useState(false);
    const { listMiner } = useListMiner();
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    console.log(listMiner);

    // Handle Create Order 
    const [id, setId] = useState("");
    const [price, setPrice] = useState("");
    const [currency, setCurrency] = useState("");
    const [apm, setApm] = useState("");

    const [numMonths, setValue] = useState(1);
    const increaseValue = () => setValue(prev => prev + 1);
    const decreaseValue = () => setValue(prev => (prev > 1 ? prev - 1 : 1));
    
    console.log(id, currency, numMonths, price);

    const finalPrice = price * numMonths;

    const amount_per_month = apm * 60 * 24 * 30;
    const usdamount = amount_per_month * 0.0075;



  

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
                                            setCurrency(data.currency);        // Set ID dynamically
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
            

                    <Header leftIcon="back" title="Create Miner"/>
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
                                                        <Text style={{...FONTS.font,color:colors.title}}>Payment Method: </Text>
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
                        defaultValue="Miner Price (excl. fees):"
                        placeholderTextColor={colors.text}
                        placeholder="Amount"
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
                            <Text style={{...FONTS.fontBold,color:COLORS.white}}>${finalPrice}</Text>
                        </View>
                       
                    </View>
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
                                        defaultValue="Discount"
                                        placeholderTextColor={colors.text}
                                        placeholder="Amount"
                                    />
                                    <View
                                        style={{
                                            flexDirection:'row',
                                            alignItems:'center',
                                            position:'absolute',
                                            right:5,
                                            top:12,
                                        }}
                                    >
                                       <View
                                            style={{
                                                height:20,
                                                backgroundColor:COLORS.primary,
                                                justifyContent:'center',
                                                paddingHorizontal:15,
                                                borderRadius:4,
                                                marginLeft:6,
                                            }}
                                        >
                                            <Text style={{...FONTS.fontBold,color:COLORS.white}}>0 %</Text>
                                        </View>
                                       
                                    </View>
                                </View>
                

                <View style={{alignItems:'center',paddingHorizontal:15,paddingTop:15,paddingBottom:30}}>
                    <Text style={{...FONTS.h2,color:colors.title}}>{finalPrice} USD</Text>
                    <Text style={{...FONTS.font,color:COLORS.primary}}>Final amount</Text>
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
                                <CustomButton title="Pay" onPress={handleSubmit} disabled={loading} />
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


export default WithdrawScreen;
