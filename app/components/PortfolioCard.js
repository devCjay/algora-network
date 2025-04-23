import React from "react";
import { 
    Image,
    Text,
    View,
} from "react-native";
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS, SIZES } from "../Utils/theme";
import { LinearGradient } from 'expo-linear-gradient';

const PortfolioCard = (props) => {

  const { colors } = useTheme();

  return (
    <View 
      style={{
        flex:1,
        backgroundColor:colors.background,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:SIZES.radiusLg,
        overflow:'hidden',
        paddingVertical:20,
        borderWidth:1,
        borderColor:colors.borderColor,
      }}
    >
      <LinearGradient
        colors={["rgb(9, 35, 97)","rgb(20, 89, 247)"]}
        style={{
          height:50,
          width:50,
          alignItems:'center',
          justifyContent:'center',
          borderRadius:48,
          marginBottom:12,
          backgroundColor:COLORS.primary,
        }}
      >
          <Image
            style={{
              height:22,
              width:22,
              resizeMode:'contain',
              tintColor: '#fff',
            }}
            source={props.icon}
          />
      </LinearGradient>
      <View
        style={{
          paddingHorizontal:8,
          alignItems:'center',
        }}
      >
        <Text style={{...FONTS.fontSm,marginBottom:2,color:colors.text}}>{props.title}</Text>
        <Text style={{...FONTS.font,color:colors.title,...FONTS.fontBold}}>{props.amount}</Text>
      </View>
    </View>
    
  );
};


export default PortfolioCard;
