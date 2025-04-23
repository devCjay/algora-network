import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/header';
import { GlobalStyleSheet } from '../../Utils/styleSheet';
import { FONTS } from '../../Utils/theme';
import ClassicAccordion from '../../components/Accordion/ClassicAccordion';
import AccordionHighlight from '../../components/Accordion/AccordionHighlight';
import AccordionSeprator from '../../components/Accordion/AccordionSeprator';

const AccordionScreen = () => {

    const {colors} = useTheme();

    return (
        <>
            <SafeAreaView style={{flex:1,backgroundColor:colors.bgColor}}>
                <Header 
                    titleLeft 
                    title={'Accordions'} 
                    leftIcon={'back'}
                />
                <ScrollView>
                    <View style={GlobalStyleSheet.container}>
                        <View style={[GlobalStyleSheet.card,{
                            backgroundColor:colors.bgLight,
                            ...GlobalStyleSheet.shadow,
                        }]}>
                            <View style={{marginBottom:15}}>
                                <Text style={{...FONTS.h6,lineHeight:18,marginBottom:2,color:colors.title}}>Classic Accordion</Text>
                            </View>
                            <ClassicAccordion/>
                        </View>
                        <View style={[GlobalStyleSheet.card,{
                            backgroundColor:colors.bgLight,
                            ...GlobalStyleSheet.shadow,
                        }]}>
                            <View style={{marginBottom:20}}>
                                <Text style={{...FONTS.h6,lineHeight:18,marginBottom:2,color:colors.title}}>Accordion Highlight</Text>
                            </View>
                            <AccordionHighlight/>
                        </View>
                        <View style={[GlobalStyleSheet.card,{
                            backgroundColor:colors.bgLight,
                            ...GlobalStyleSheet.shadow,
                        }]}>
                            <View style={{marginBottom:20}}>
                                <Text style={{...FONTS.h6,lineHeight:18,marginBottom:2,color:colors.title}}>Accordion Seprator</Text>
                            </View>
                            <AccordionSeprator/>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};


export default AccordionScreen;