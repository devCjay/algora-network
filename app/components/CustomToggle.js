import React from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useTheme } from '@react-navigation/native';
import { COLORS } from '../Utils/theme';

const CustomToggle = ({value}) => {

    const offset = useSharedValue(0);
    const {colors} = useTheme(); 

    const animatedStyles = useAnimatedStyle(() => {
        return {
          transform: [{ translateX: offset.value}],
        };
    });

    if(value){
        offset.value = withSpring(22);
    }else{
        offset.value = withSpring(0);
    }

    return (
        <View
            style={{
                height:24,
                width:45,
                borderRadius:12,
                backgroundColor:value ? COLORS.primary : colors.bgLight,
                borderWidth:1,
                borderColor:colors.borderColor,
                shadowColor: "rgba(0,0,0,.5)",
                shadowOffset: {
                    width: 0,
                    height: 4,
                },
                shadowOpacity: 0.30,
                shadowRadius: 4.65,

                elevation: 8,
            }}
        >
            <Animated.View
                style={[animatedStyles,{
                    height:18,
                    width:18,
                    borderRadius:9,
                    backgroundColor:value ? COLORS.white : COLORS.primary,
                    position:'absolute',
                    left:3,
                    top:2,
                }]}
            />
        </View>
    );
};


export default CustomToggle;