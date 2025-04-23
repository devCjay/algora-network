import React from "react";
import { 
  View,
  Text,
  TouchableOpacity,
  Platform
} from "react-native";
import { useTheme } from '@react-navigation/native';
import { SvgXml } from "react-native-svg";
import { COLORS, FONTS, ICONS } from "../Utils/theme";
import { useNavigation } from '@react-navigation/native';
import { GlobalStyleSheet } from "../Utils/styleSheet";

const Header = (props) => {
  
    const navigation = useNavigation();
    const { colors } = useTheme();

  return (
    <>
      <View
        style={[GlobalStyleSheet.container,{
            padding:0,
            height:45,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:"space-between",
            backgroundColor:props.primaryBg ?  COLORS.mycolor2 : colors.background,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 10,
            zIndex:1,
        },
        props.transparent && {
            position:'absolute',
            zIndex:1,
            width:'100%',
            backgroundColor:'transparent',
            elevation:0,
            shadowOpacity: 0,
        }
        ]}
      >
            {props.leftIcon === "back" ?
                <TouchableOpacity
                    style={{
                        height:40,
                        width:40,
                        alignItems:'center',
                        justifyContent:'center',
                    }}
                   onPress={()=> {navigation.replace("DrawerNavigation")}}
                >
                    <SvgXml
                        height={16}
                        width={16}
                        xml={ICONS.back}
                        fill={props.primaryBg ? COLORS.white : colors.title}
                    />
                </TouchableOpacity>
                :
                <View style={{width:40}}/>
            }
            <View style={
                [
                    {flex:1,
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'center'
                    },
                    props.rate && {
                        justifyContent:'flex-start'
                    },
                    props.titleLeft && {
                        justifyContent:'flex-start'
                    }
                ]}>
                <Text style={
                    [
                        {...FONTS.h6,
                        color: props.primaryBg ? COLORS.white : props.transparent ?  COLORS.white : colors.title,
                        lineHeight:Platform.OS === 'ios' ? 16 : 20,
                        },
                        props.rightIcon && {
                            paddingLeft:15
                        }
                    ]}>{props.title}</Text>
                {props.rate &&
                    <View
                        style={{
                            height:20,
                            backgroundColor:COLORS.secondary,
                            borderRadius:3,
                            paddingHorizontal:5,
                            justifyContent:'center',
                            marginLeft:10,
                        }}
                    >
                        <Text style={{...FONTS.fontSm,color:COLORS.white}}>{props.rate}</Text>
                    </View> 
                }
            </View>
            {props.rightIcon === "trade" ?
                <TouchableOpacity 
                    onPress={()=> navigation.navigate('TradeDetails')}
                    style={{
                        width:40,
                        height:40,
                        alignItems:'center',
                        justifyContent:'center',
                    }}
                >
                    <SvgXml
                        height={18}
                        width={20}
                        xml={ICONS.trade}
                    />
                </TouchableOpacity>
                :
                <View
                    style={{width:40}}
                />
            }
            {props.rightIcon2 === "calculator" && 
                <TouchableOpacity 
                    onPress={()=> props.modal(true)}
                    style={{
                        width:40,
                        height:40,
                        alignItems:'center',
                        justifyContent:'center',
                        marginRight:6,
                    }}
                >
                    <SvgXml
                        height={20}
                        width={20}
                        xml={ICONS.calculator}
                    />
                </TouchableOpacity>
            }
        </View>
    </>
  );
};

export default Header;
