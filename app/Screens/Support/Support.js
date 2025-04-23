import React, { useState } from "react";
import { 
  Text,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
  Platform,
} from "react-native";
import { useTheme } from '@react-navigation/native';
import Header from "../../layout/header";
import { COLORS, FONTS, IMAGES, SIZES } from "../../Utils/theme";
import { GlobalStyleSheet } from "../../Utils/styleSheet";
import CustomButton from "../../components/CustomButton";
import CustomSelectBox from "../../components/CustomSelectBox";
import { launchImageLibrary } from "react-native-image-picker";


const Support = () => {
    
    const [isFocused , setisFocused] = useState(false);
    const [itemValue , setItemValue] = useState('');
    const { colors } = useTheme();
   
    const handleProfileImage = async () => {
        if(Platform.OS === 'ios'){
            let options = {
                mediaType: 'photo',
                maxWidth: 200,
                maxHeight: 200,
                quality: 1,
            };
            launchImageLibrary(options, (response) => {
                if(!response.didCancel){
                    // do something
                }
            })
        }else{
            try {
            await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
            ]).then((result) => {
                if (result['android.permission.CAMERA']
                && result['android.permission.READ_EXTERNAL_STORAGE'] === 'granted') {
                    let options = {
                        mediaType: 'photo',
                        maxWidth: 200,
                        maxHeight: 200,
                        quality: 1,
                    };
                    launchImageLibrary(options, (response) => {
                        if(!response.didCancel){
                            // do something
                        }
                    })
                }
            });
            } catch (err) {
                console.warn(err);
            }
        }
    
      }

    return (
        <>
            <SafeAreaView style={{flex:1,backgroundColor:colors.background}}>
               
                <View
                    style={{
                        flex:1,
                        backgroundColor:colors.ThemeBg,
                    }}
                >
                    <Header leftIcon="back" title="Support"/>
                    <ScrollView contentContainerStyle={{flexGrow:1}}>
                        <View style={{...GlobalStyleSheet.container,flex:1}}>
                            <View style={{flex:1}}>
                                <View
                                    style={{
                                        borderWidth:1,
                                        borderColor:colors.borderColor,
                                        backgroundColor:colors.bgLight,
                                        borderRadius:SIZES.radius,
                                        paddingHorizontal:15,
                                        paddingVertical:18,
                                    }}
                                >
                                    <Text style={{...FONTS.fontSm,...FONTS.fontMedium,color:COLORS.primary,marginBottom:6}}>Ticket For</Text>
                                    <View style={{marginBottom:20}}>
                                        <CustomSelectBox
                                            selectItems={['Color Issue' , 'Response']}
                                            defaultValue={'Select Issue'}
                                            value={itemValue}
                                            setValue={setItemValue}
                                        />
                                    </View>
                                    <Text style={{...FONTS.fontSm,...FONTS.fontMedium,color:COLORS.primary,marginBottom:6}}>Message</Text>
                                    <TextInput
                                        multiline={true}
                                        numberOfLines={10}
                                        textAlignVertical={'top'}
                                        style={[{
                                            ...GlobalStyleSheet.formControl,
                                            backgroundColor:colors.inputBg,
                                            color:colors.title,
                                            borderColor:colors.borderColor,
                                            height:140,
                                            marginBottom:20,
                                            paddingTop:15,
                                        },isFocused && styles.inputActive]}
                                        onFocus={() => setisFocused(true)}
                                        onBlur={() => setisFocused(false)}
                                        placeholderTextColor={colors.text}
                                        placeholder="Enter message.."
                                    />

                                    <TouchableOpacity
                                        onPress={() => handleProfileImage()}
                                        activeOpacity={.8}
                                        style={{
                                            borderWidth:2,
                                            borderStyle:'dashed',
                                            borderColor:colors.borderColor,
                                            borderRadius:SIZES.radius,
                                            padding:18,
                                            alignItems:'center',
                                        }}
                                    >
                                        <View
                                            style={{
                                                height:55,
                                                width:55,
                                                marginBottom:12,
                                                borderRadius:30,
                                                borderWidth:1,
                                                borderColor:colors.borderColor,
                                                alignItems:'center',
                                                justifyContent:'center',
                                            }}
                                        >
                                            <Image
                                                source={IMAGES.file2}
                                                style={{
                                                    height:24,
                                                    width:24,
                                                    tintColor:COLORS.primary,
                                                }}
                                            />
                                        </View>
                                        <Text style={{...FONTS.font,color:colors.title,textAlign:'center',marginBottom:6}}>Drag & drop your files here</Text>
                                        <Text style={{...FONTS.fontSm,color:colors.text,textAlign:'center'}}>50 Mb max file size</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <CustomButton title="Create Ticket"/>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </>
    );
};





const styles = StyleSheet.create({

    inputActive:{
        borderColor:COLORS.primary,
    },
    

})


export default Support;
