import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../Utils/theme';

const Button = (props) => {
    return (
        <TouchableOpacity
            activeOpacity={.8}
            onPress={()=> props.onPress && props.onPress()}
            style={[{
                ...props.style,
                backgroundColor: props.color ? props.color : COLORS.primary,
                paddingHorizontal:14,
                paddingVertical:12,
                borderRadius: props.btnSquare ? 0 : props.btnRounded ? 30 : SIZES.radius,
                alignItems:'center',
            }]}
        >
            <Text numberOfLines={1} style={[{...FONTS.h6,fontSize:15,color:COLORS.white}, props.textColor && {color : props.textColor}]}>{props.title}</Text>
        </TouchableOpacity>
    );
};


export default Button;