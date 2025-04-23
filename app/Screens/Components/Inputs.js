import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../Utils/styleSheet';
import { COLORS, FONTS, ICONS, SIZES } from '../../Utils/theme';
import Header from '../../layout/header';
import CustomInput from '../../components/Input/CustomInput';

const Inputs = () => {

    const {colors} = useTheme();
    const [passwordShow , setPasswordShow ] = useState(true);
    
    const handndleShowPassword = () => {
        setPasswordShow(!passwordShow);
    }

    return (
        <>
            <SafeAreaView style={{flex:1,backgroundColor:colors.bgColor}}>
                <Header 
                    titleLeft
                    title={'Inputs'}  
                    leftIcon={'back'}
                />
                <ScrollView>
                    <View style={GlobalStyleSheet.container}>
                        <View style={[GlobalStyleSheet.card,{
                            backgroundColor:colors.bgLight,
                            ...GlobalStyleSheet.shadow,
                        }]}>

                            <View style={{marginBottom:15}}>
                                <Text style={{...FONTS.h6,lineHeight:18,marginBottom:2,color:colors.title}}>Input with icon background</Text>
                            </View>

                            <View style={{marginBottom:15}}>
                                <View style={styles.inputIcon}>
                                    <SvgXml
                                        stroke={COLORS.white}
                                        height={20}
                                        width={20}
                                        xml={ICONS.user}
                                    />
                                </View>
                                <TextInput
                                    style={[styles.inputStyle,{borderColor:colors.borderColor,color:colors.title}]}
                                    placeholder='Username'
                                    placeholderTextColor={colors.text}
                                />
                            </View>
                            <View style={{marginBottom:15}}>
                                <View style={styles.inputIcon}>
                                    <SvgXml
                                        stroke={COLORS.white}
                                        height={20}
                                        width={20}
                                        xml={ICONS.email}
                                    />
                                </View>
                                <TextInput
                                    style={[styles.inputStyle,{borderColor:colors.borderColor,color:colors.title}]}
                                    placeholder='Email'
                                    placeholderTextColor={colors.text}
                                />
                            </View>
                            <View style={{marginBottom:15}}>
                                <View style={styles.inputIcon}>
                                    <SvgXml
                                        fill={COLORS.white}
                                        height={20}
                                        width={20}
                                        xml={ICONS.lock}
                                    />
                                </View>
                                <TextInput
                                    secureTextEntry={passwordShow}
                                    style={[styles.inputStyle,{borderColor:colors.borderColor,color:colors.title}]}
                                    placeholder='Password'
                                    placeholderTextColor={colors.text}
                                />
                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityLabel="Password"
                                    accessibilityHint="Password show and hidden"
                                    onPress={() => handndleShowPassword()}
                                    style={styles.eyeIcon}>
                                    <FeatherIcon 
                                        size={20}
                                        color={colors.text}
                                        name={passwordShow ? "eye-off" : "eye"} />
                                </TouchableOpacity>
                            </View>

                        </View>

                        <View style={[GlobalStyleSheet.card,{
                            backgroundColor:colors.bgLight,
                            ...GlobalStyleSheet.shadow,
                        }]}>
                            <View style={{marginBottom:15}}>
                                <Text style={{...FONTS.h6,lineHeight:18,marginBottom:2,color:colors.title}}>Input with icon</Text>
                            </View>
                            <View style={{marginBottom:15}}>
                                <CustomInput
                                    icon={<FontAwesome style={{opacity:.6}} name={'user'} size={20} color={colors.text}/> }
                                    value={''}  
                                    placeholder="Enter Username"
                                    onChangeText={(value)=> console.log(value)}
                                />
                            </View>
                            <View style={{marginBottom:15}}>
                                <CustomInput
                                    icon={<MaterialIcon style={{opacity:.6}} name={'email'} size={20} color={colors.text}/>}
                                    value={''}  
                                    placeholder="Enter Email"
                                    onChangeText={(value)=> console.log(value)}
                                />
                            </View>
                            <View style={{marginBottom:15}}>
                                <CustomInput
                                    type={'password'}
                                    icon={<FontAwesome style={{opacity:.6}} name={'lock'} size={20} color={colors.text}/> }
                                    value={''}  
                                    placeholder="Password"
                                    onChangeText={(value)=> console.log(value)}
                                />
                            </View>
                        </View>

                        <View style={[GlobalStyleSheet.card,{
                            backgroundColor:colors.bgLight,
                            ...GlobalStyleSheet.shadow,
                        }]}>
                            <View style={{marginBottom:15}}>
                                <Text style={{...FONTS.h6,lineHeight:18,marginBottom:2,color:colors.title}}>Input with different sizes</Text>
                            </View>
                            <View style={{marginBottom:15}}>
                                <CustomInput
                                    inputLg
                                    icon={<FontAwesome style={{opacity:.6}} name={'user'} size={20} color={colors.text}/> }
                                    value={''}  
                                    placeholder="Enter Username"
                                    onChangeText={(value)=> console.log(value)}
                                />
                            </View>
                            <View style={{marginBottom:15}}>
                                <CustomInput
                                    icon={<FontAwesome style={{opacity:.6}} name={'user'} size={20} color={colors.text}/> }
                                    value={''}  
                                    placeholder="Enter Username"
                                    onChangeText={(value)=> console.log(value)}
                                />
                            </View>
                            <View style={{marginBottom:15}}>
                                <CustomInput
                                    inputSm
                                    icon={<FontAwesome style={{opacity:.6}} name={'user'} size={20} color={colors.text}/> }
                                    value={''}  
                                    placeholder="Enter Username"
                                    onChangeText={(value)=> console.log(value)}
                                />
                            </View>
                        </View>
                        
                        
                        <View style={[GlobalStyleSheet.card,{
                            backgroundColor:colors.bgLight,
                            ...GlobalStyleSheet.shadow,
                        }]}>
                            <View style={{marginBottom:15}}>
                                <Text style={{...FONTS.h6,lineHeight:18,marginBottom:2,color:colors.title}}>Modern Fields With Radius</Text>
                            </View>
                            <View style={{marginBottom:15}}>
                                <CustomInput
                                    inputRounded
                                    icon={<FontAwesome style={{opacity:.6}} name={'user'} size={20} color={colors.text}/> }
                                    value={''}  
                                    placeholder="Enter Username"
                                    onChangeText={(value)=> console.log(value)}
                                />
                            </View>
                            <View style={{marginBottom:15}}>
                                <CustomInput
                                    inputRounded
                                    icon={<MaterialIcon style={{opacity:.6}} name={'email'} size={20} color={colors.text}/>}
                                    value={''}  
                                    placeholder="Enter Email"
                                    onChangeText={(value)=> console.log(value)}
                                />
                            </View>
                            <View style={{marginBottom:15}}>
                                <CustomInput
                                    inputRounded
                                    type={'password'}
                                    icon={<FontAwesome style={{opacity:.6}} name={'lock'} size={20} color={colors.text}/> }
                                    value={''}  
                                    placeholder="Password"
                                    onChangeText={(value)=> console.log(value)}
                                />
                            </View>
                        </View>

                        <View style={[GlobalStyleSheet.card,{
                            backgroundColor:colors.bgLight,
                            ...GlobalStyleSheet.shadow,
                        }]}>
                            <View style={{marginBottom:15}}>
                                <Text style={{...FONTS.h6,lineHeight:18,marginBottom:2,color:colors.title}}>Input with border</Text>
                            </View>
                            <View style={{marginBottom:15}}>
                                <CustomInput
                                    inputBorder
                                    icon={<FontAwesome style={{opacity:.6}} name={'user'} size={20} color={colors.text}/> }
                                    value={''}  
                                    placeholder="Enter Username"
                                    onChangeText={(value)=> console.log(value)}
                                />
                            </View>
                            <View style={{marginBottom:15}}>
                                <CustomInput
                                    inputBorder
                                    icon={<MaterialIcon style={{opacity:.6}} name={'email'} size={20} color={colors.text}/>}
                                    value={''}  
                                    placeholder="Enter Email"
                                    onChangeText={(value)=> console.log(value)}
                                />
                            </View>
                            <View style={{marginBottom:15}}>
                                <CustomInput
                                    inputBorder
                                    type={'password'}
                                    icon={<FontAwesome style={{opacity:.6}} name={'lock'} size={20} color={colors.text}/> }
                                    value={''}  
                                    placeholder="Password"
                                    onChangeText={(value)=> console.log(value)}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    card : {
        padding:15,
        borderRadius:SIZES.radius,
        marginBottom:15,
        borderWidth:1,
        borderColor:COLORS.borderColor,
        backgroundColor:COLORS.white,
    },
    inputStyle:{
        ...FONTS.fontLg,
        height:50,
        paddingLeft:60,
        borderWidth : 1,
        borderRadius: SIZES.radius,
    },
    inputIcon:{
        backgroundColor:COLORS.primary,
        height:40,
        width:40,
        borderRadius:10,
        position : 'absolute',
        left:5,
        top : 5,
        alignItems:'center',
        justifyContent:'center',
    },
    eyeIcon:{
        position:'absolute',
        height:50,
        width:50,
        alignItems:'center',
        justifyContent:'center',
        right:0,
        zIndex:1,
        top:0,
    }
})


export default Inputs;