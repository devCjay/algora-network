import React, { useState } from "react";
import { Image, Text, View, Alert, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation, useTheme } from '@react-navigation/native';
import { COLORS, FONTS, IMAGES, SIZES } from '../../Utils/theme';
import { GlobalStyleSheet } from "../../Utils/styleSheet";
import Button from "../../components/Button/Button";
import Divider from '../../components/Dividers/Divider';
import { purchaseTicket } from '../../Api/raffleApi';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Cards = () => {
    
    const {colors} = useTheme();
    const [loading, setLoading] = useState(false);
    const [raffle_id, setRaffleId] = useState("");
    const [amount, setAmount] = useState("");
    const navigation = useNavigation();
    
        const handleSubmit = async () => {
            console.log(raffle_id);

            setLoading(true);

            await AsyncStorage.setItem("ticketId", JSON.stringify(raffle_id));
            navigation.replace("TicketDetails"); // Navigate to home after login

            setLoading(false);
    
    
        }
    

    const Data = [
        'Ticket Price:',
        'Total Tickets',
        'Partiscipants',
    ]

    return (
        <>
            <View
                style={{
                    padding:30,
                    paddingTop:60,
                    position:'relative',
                    marginTop:50,
                    borderRadius:0,
                    backgroundColor:colors.background,
                    borderWidth:1,
                    borderColor:colors.borderColor,
                    maxWidth:320,
                    width:'100%',
                    shadowColor: "rgba(0,0,0,.6)",
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.30,
                    shadowRadius: 4.65,

                    elevation: 8,
                }}
            >
                <View style={{
                    alignItems:'center',
                }}>
                    <View
                        style={{
                            height:80,
                            width:80,
                            borderRadius:40,
                            alignItems:'center',
                            justifyContent:'center',
                            backgroundColor:colors.background,
                            position:'absolute',
                            top:-100,
                            borderWidth:1,
                            borderColor:colors.borderColor,
                            shadowColor: "rgba(0,0,0,.6)",
                            shadowOffset: {
                                width: 0,
                                height: 4,
                            },
                            shadowOpacity: 0.30,
                            shadowRadius: 4.65,

                            elevation: 8,
                        }}
                    >
                        <Image
                            style={{
                                height:44,
                                width:44,
                            }}
                            source={IMAGES.star}
                        />
                    </View>
                </View>
                <View style={{alignItems:'center',marginBottom:25}}>

                    <Text style={{...FONTS.h4,color:colors.title,marginBottom:5}}>Raffle #1</Text>

                    <View style={{flexDirection:'row',alignItems:'flex-end',marginBottom:5}}>
                        <Text style={{...FONTS.h2,lineHeight:35,color:colors.title}}>30 USD</Text>
                        <Text style={{...FONTS.font,...FONTS.fontBold,fontSize:16,color:colors.title,marginBottom:5,marginLeft:3}}>/ Current Prize Pool</Text>
                    </View>
        
                </View>


             
            </View>
        </>
    );
};



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



export default Cards;