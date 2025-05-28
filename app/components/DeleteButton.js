import React from "react";
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity,
  View
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SIZES } from "../Utils/theme";


const DeleteButton = (props) => {
 
  return (
    <TouchableOpacity
      activeOpacity={.75}
      onPress={()=> props.onPress ? props.onPress() : ""}
    >
      {props.color ?
        <View
          style={[{...styles.button,backgroundColor:props.color},props.btnSm && {height: 40},props.btnRounded && {borderRadius:30}  && {borderColor:COLORS.white} && { border}]}
        >
          <Text style={{...FONTS.h5,color:COLORS.white}}>{props.title}</Text>
        </View>
        :
        <LinearGradient
        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
        colors={["#f90401","#d95655"]}
        style={[{...styles.button},props.btnSm && {height: 40},props.btnRounded && {borderRadius:30}]}
        >
          <Text style={{...FONTS.h5,color:COLORS.white}}>{props.title}</Text>
        </LinearGradient>
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({

    button:{
        height: 48,
        borderRadius:SIZES.radius,
        alignItems:'center',
        justifyContent:'center',
    }

})

export default DeleteButton;
