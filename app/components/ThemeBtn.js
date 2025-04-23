import React from 'react';
import { useTheme } from '@react-navigation/native';
import { Image, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { COLORS, IMAGES } from '../Utils/theme';
import themeContext from '../Utils/themeContext';

const ThemeBtn = () => {

    const {colors} = useTheme();
    const theme = useTheme();
    
    const {setDarkTheme,setLightTheme} = React.useContext(themeContext);

    const offset = useSharedValue(0);
    const opacityDark = useSharedValue(0);
    const opacityLight = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => {
        return {
          transform: [{ translateX: offset.value}],
        };
    });
   
    if(theme.dark){
        offset.value = withSpring(34);
        opacityDark.value = withTiming(1);
        opacityLight.value = withTiming(0);
    }else{
        offset.value = withSpring(0);
        opacityLight.value = withTiming(1);
        opacityDark.value = withTiming(0);
    }


    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
               
            }
            }
            style={{
                height:35,
                width:35,
                borderRadius:17,
                flexDirection:'row',
                alignItems:'center',
                backgroundColor:colors.borderColor,
                shadowColor: "rgba(0,0,0,.3)",
                shadowOffset: {
                width: 0,
                height: 5,
                },
                shadowOpacity: 0.34,
                shadowRadius: 6.27,

                elevation: 10,
            }}
            >
            
           


            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Image
                    source={IMAGES.online}
                    style={{
                        height:95,
                        width:95,
                        tintColor:theme.dark ? COLORS.white : colors.text,
                    }}
                />
            </View>

        </TouchableOpacity>
    );
};


export default ThemeBtn;