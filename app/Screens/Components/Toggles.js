import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../Utils/styleSheet';
import Header from '../../layout/header';
import { FONTS } from '../../Utils/theme';
import ToggleStyle1 from '../../components/Toggles/ToggleStyle1';
import ToggleStyle2 from '../../components/Toggles/ToggleStyle2';
import ToggleStyle3 from '../../components/Toggles/ToggleStyle3';
import ToggleStyle4 from '../../components/Toggles/ToggleStyle4';

const Toggles = () => {
    
    const {colors} = useTheme();

    return (
        <>
            <SafeAreaView style={{flex:1,backgroundColor:colors.bgColor}}>
                <Header title={'Toggles'} titleLeft leftIcon={'back'}/>
                <ScrollView>
                    <View style={{...GlobalStyleSheet.container}}>
                        <View style={[GlobalStyleSheet.card,{
                            backgroundColor:colors.bgLight,
                            ...GlobalStyleSheet.shadow,
                        }]}>
                            <View
                                style={{
                                    paddingVertical:14,
                                    borderBottomWidth:1,
                                    borderBottomColor:colors.borderColor,
                                    flexDirection:"row",
                                    alignItems:'center',
                                    justifyContent:'space-between',
                                }}
                            >
                                <Text style={{...FONTS.font,color:colors.title,...FONTS.fontBold}}>Default toggle</Text>
                                
                                <ToggleStyle1/>
                                
                            </View>
                            <View
                                style={{
                                    paddingVertical:14,
                                    borderBottomWidth:1,
                                    borderBottomColor:colors.borderColor,
                                    flexDirection:"row",
                                    alignItems:'center',
                                    justifyContent:'space-between',
                                }}
                            >
                                <Text style={{...FONTS.font,color:colors.title,...FONTS.fontBold}}>Toggle with icon</Text>
                                
                                <ToggleStyle2/>
                                
                            </View>
                            <View
                                style={{
                                    paddingVertical:14,
                                    borderBottomWidth:1,
                                    borderBottomColor:colors.borderColor,
                                    flexDirection:"row",
                                    alignItems:'center',
                                    justifyContent:'space-between',
                                }}
                            >
                                <Text style={{...FONTS.font,color:colors.title,...FONTS.fontBold}}>Toggle with text</Text>
                                
                                <ToggleStyle3/>
                                
                            </View>
                            <View
                                style={{
                                    paddingVertical:14,
                                    borderBottomWidth:1,
                                    borderBottomColor:colors.borderColor,
                                    flexDirection:"row",
                                    alignItems:'center',
                                    justifyContent:'space-between',
                                }}
                            >
                                <Text style={{...FONTS.font,color:colors.title,...FONTS.fontBold}}>Toggle Radio</Text>
                                
                                <ToggleStyle4/>
                                
                            </View>

                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};


export default Toggles;