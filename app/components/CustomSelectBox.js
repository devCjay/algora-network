import React, { useState } from "react";
import { 
  Modal, 
  StyleSheet, 
  Text, 
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { COLORS, FONTS, ICONS, SIZES } from "../Utils/theme";
import { useTheme } from "@react-navigation/native";
import { GlobalStyleSheet } from "../Utils/styleSheet";

const CustomSelectBox = (props) => {
    
    const { colors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [activeItem , setActiveItem] = useState(props.defaultValue);


  return (
    <>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <View style={styles.modalContainer}>
                <View
                    style={[GlobalStyleSheet.container,{
                        padding:20,
                        backgroundColor:colors.bgLight,
                        borderRadius:4,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 5,
                        },
                        shadowOpacity: 0.34,
                        shadowRadius: 6.27,
                        elevation: 10,
                    }]}
                >
                    <View
                        style={{
                            alignItems:'flex-end',
                            marginBottom:10,
                        }}
                    >
                        <TouchableOpacity 
                            activeOpacity={.8}
                            style={{padding:10}}
                            onPress={()=> setModalVisible(false)}
                        >
                            <SvgXml stroke={colors.title} xml={ICONS.close}/>
                        </TouchableOpacity>
                    </View>
                    {props.selectItems.map((data,index) => {
                        return(
                            <View style={{marginBottom:15}}  key={index}>
                                <TouchableOpacity
                                    onPress={()=> {setActiveItem(data);setModalVisible(false);props.setValue(data)}}
                                    style={[{
                                        backgroundColor:colors.background,
                                        height:50,
                                        borderRadius:SIZES.radius,
                                        alignItems:'center',
                                        justifyContent:'center',
                                        borderWidth:1,
                                        borderColor:colors.borderColor,
                                    },activeItem === data && {backgroundColor:COLORS.primary,borderColor:COLORS.primary}]}
                                >
                                    <Text style={[{...FONTS.h5,color:colors.text},activeItem === data && {color:COLORS.white}]}>{data}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </View>
            </View>
        </Modal>


        <TouchableOpacity
            onPress={()=> setModalVisible(true)}
            style={{
                backgroundColor:colors.inputBg,
                borderRadius:SIZES.radius,
                height: props.size === "small" ? 38 : 48,
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between',
                paddingHorizontal:12,
                borderColor:colors.borderColor,
                borderWidth:1,
            }}
        >
            <Text style={[{...FONTS.fontLg,...FONTS.fontMedium,color:colors.title},props.size === "small" && {...FONTS.fontSm}]}>{props.value ?  props.value : props.defaultValue}</Text>
            <SvgXml
                height={18}
                width={props.size === "small" ? 14 : 18}
                fill={colors.title}
                xml={ICONS.down}
            />
        </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({

    modalContainer:{
        backgroundColor:'rgba(0,0,0,.6)',
        flex:1,
        justifyContent:'center',
        padding:15,
    }

})

export default CustomSelectBox;
