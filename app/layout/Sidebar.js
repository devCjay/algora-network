import React, { useCallback, useMemo, useRef, useState, useEffect } from "react";

import { Image, ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, IMAGES } from '../Utils/theme';
import ThemeBtn from '../components/ThemeBtn';
import { logoutUser } from '../Api/authApi';
import { useUserData } from '../Api/userApi'; // Import the custom hook
import Toast from "react-native-toast-message";
import * as Clipboard from 'expo-clipboard';

import PulsatingIndicator from '../components/PulsatingIndicator';
import { useListUserMiner } from "../Api/minerApi";

function Sidebar() {

    const navigation = useNavigation();
    const {colors} = useTheme();
    const { username, email, usdbalance, machineinitcode, supportphrase, uid} = useUserData();
    console.log(username);


     const { minerData } = useListUserMiner();
    const [isOnline, setIsOnline] = useState(false);

    useEffect(() => {
              if (minerData.length) {
                console.log(minerData);
                setIsOnline(true);
              }
            }, [minerData]); // Run when `myOrder` updates


    //logout Function
    const handleLogout = async () => {
        await logoutUser(); // Clear AsyncStorage token
        navigation.replace("SignIn"); // Redirect user to Login screen

         Toast.show({
                  type: "success",
                  text1: "Logout Successful",
                });
      };

     // const {uuid} = machineinitcode;


     const shortenUUID = (uuid) => {
        if (!uuid) return "Invalid UUID"; // Prevent errors
        const parts = uuid.split("-");
        return parts.length === 5 ? `${parts[0]}-${parts[4]}` : "Invalid UUID";
      };

      // Example UUID (You'd get this from your API or state)
    const uuid = machineinitcode; 

    const shortUUID = shortenUUID(uuid);

    const copyToClipboard = () => {
        Clipboard.setString(uuid); // Copy full UUID
        Toast.show({
        type: "success",
        text1: "Copied!",
        text2: "Full UUID copied to clipboard.",
        });
    };


    return (
        <View
            style={{
                flex:1,
                backgroundColor:colors.background,
            }}
        >
            {Platform.OS === 'web' ? 
                <View
                    style={{
                        paddingHorizontal:15,
                        paddingVertical:15,  
                        alignItems:'flex-start',
                    }}
                >
                    <View
                        style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                            width:'100%',
                        }}
                    >
                        <View
                            style={{
                                marginBottom:15,
                                padding:4,
                                borderRadius:50,
                                backgroundColor:'rgba(255,255,255,.1)',
                            }}
                        >
                            <Image
                                source={IMAGES.profile}
                                style={{
                                    height:50,
                                    width:50,
                                    borderRadius:50,
                                }}
                            />                    
                        </View>
                        <View style={{marginTop:5}}>
                        <PulsatingIndicator isOnline={isOnline} />  
                        </View>
                    </View>
                    <Text style={{...FONTS.h6,color:colors.title,marginBottom:3}}>Username: {username} </Text>
                    
                </View> 
                :

                <ImageBackground
                    source={IMAGES.pattern}
                    style={{
                        paddingHorizontal:15,
                        paddingVertical:15,  
                        alignItems:'flex-start',
                    }}
                >
                    <View
                        style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                            width:'100%',
                        }}
                    >
                        <View
                            style={{
                                marginBottom:15,
                                padding:4,
                                borderRadius:50,
                                backgroundColor:'rgba(255,255,255,.1)',
                            }}
                        >
                            <Image
                                source={IMAGES.profile}
                                style={{
                                    height:30,
                                    width:30,
                                    borderRadius:50,
                                }}
                            />                    
                        </View>
                        <View style={{marginTop:5}}>
                          
                           <PulsatingIndicator isOnline={isOnline} />  
                        </View>
                    </View>
                    <Text style={{...FONTS.h6,color:COLORS.white,marginBottom:3}}>Username: {username} </Text>
                    
                </ImageBackground>
            }
            <View style={{flex:1,paddingVertical:15}}>
                
            <TouchableOpacity
                    style={styles.navItem}
                    
                >
                    <Image
                        source={IMAGES.email}
                        style={{
                            height:18,
                            width:18,
                            tintColor:colors.text,
                            marginRight:12,
                        }}
                    />
                    <Text style={{...FONTS.font,...FONTS.fontSemiBold,color:colors.title,flex:1}}>Email: {email}</Text>
                    <FeatherIcon size={16} color={colors.text} name={'chevron-right'}/>
                </TouchableOpacity>
                

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={copyToClipboard}
                >
                    <FeatherIcon style={{marginRight:12}} color={colors.text} size={18} name='grid'/>
                    <Text style={{...FONTS.font,...FONTS.fontSemiBold,color:colors.title,flex:1}}>Machine Code: {shortUUID}</Text>
                    <FeatherIcon size={16} color={colors.text} name={'copy'}/>
                </TouchableOpacity>


                <TouchableOpacity
                    style={styles.navItem}
                   
                >
                    <Image
                        source={IMAGES.support}
                        style={{
                            height:18,
                            width:18,
                            tintColor:colors.text,
                            marginRight:12,
                        }}
                    />
                    <Text style={{...FONTS.font,...FONTS.fontSemiBold,color:colors.title,flex:1}}>Support Phrase: {supportphrase}</Text>
                    <FeatherIcon size={16} color={colors.text} name={'copy'}/>
                </TouchableOpacity>


               


                <TouchableOpacity
                    style={styles.navItem}
                    onPress={handleLogout}
                >
                    <Image
                        source={IMAGES.logout}
                        style={{
                            height:18,
                            width:18,
                            tintColor:colors.text,
                            marginRight:12,
                        }}
                    />
                    <Text style={{...FONTS.font,...FONTS.fontSemiBold,color:colors.title,flex:1}}>Logout</Text>
                    <FeatherIcon size={16} color={colors.text} name={'chevron-right'}/>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    paddingHorizontal:15,
                    paddingVertical:20,
                }}
            >
                <Text style={{...FONTS.h6,color:colors.title,marginBottom:5}}>Algora Network</Text>
                <Text style={{...FONTS.font,color:colors.text}}>App Version 1.0.1</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    navItem : {
        paddingHorizontal:15,
        paddingVertical:12,
        flexDirection:'row',
        alignItems:'center',
    }
})

export default Sidebar;