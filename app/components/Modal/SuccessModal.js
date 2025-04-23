import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS, SIZES } from '../../Utils/theme';


const SuccessModal = () => {

    const {colors} = useTheme();

    return (
        <>
            <View style={{
                alignItems:'center',
                paddingHorizontal:30,
                paddingVertical:20,
                paddingBottom:30,
                backgroundColor:colors.bgLight,
                borderRadius:SIZES.radius,
                marginHorizontal:30,
                maxWidth:340,
                
            }}>
                <Ionicons name='checkmark-circle' style={{marginBottom:8}} color={COLORS.success} size={60}/>
                <Text style={{...FONTS.h5,color:colors.title,marginBottom:6}}>🎉 Payment Successful!</Text>
                <Text style={{...FONTS.font,color:colors.text,textAlign:'center'}}>You will be redirected...</Text>

            </View>
        </>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    successText: {
      fontSize: 18,
      color: 'green',
      marginBottom: 10,
    },
    button: {
      backgroundColor: 'green',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
  });

export default SuccessModal;