import React from "react";
import { 
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useNavigation, useTheme } from '@react-navigation/native';
import { COLORS, FONTS, IMAGES, SIZES } from "../Utils/theme";
import { LinearGradient } from 'expo-linear-gradient';

const BannerCard = (props) => {

    const navigation = useNavigation();
    
  return (
    <View>
        <LinearGradient 
            start={{x: 0.25, y: 0}} end={{x: .5, y: 0}}
            colors={["rgb(15, 67, 187)","rgb(20, 89, 247)"]}
            style={styles.card}
        >
            <Image
                source={props.image}
                style={{
                    height:100,
                    width:100,
                    resizeMode:'contain',
                    marginRight:30,
                    marginLeft:10,
                }}
            />
            <View style={{
                alignItems:'flex-start',
                flex:1,
            }}>
                <Text style={{...FONTS.fontSm,color:'#fff',opacity:.7,marginBottom:4}}>{props.subTitle}</Text>
                <Text style={{...FONTS.h5,color:COLORS.white,marginBottom:10}}>{props.title}</Text>
            
            </View>
        </LinearGradient>
    </View>
  );
};



const styles = StyleSheet.create({
    card:{
        borderRadius:SIZES.radius,
        paddingVertical:12,
        zIndex:1,
        paddingHorizontal:20,
        height:150,
        flexDirection:'row',
        alignItems:'center',
    }
})


export default BannerCard;
