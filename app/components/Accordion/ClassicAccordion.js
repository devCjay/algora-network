import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import FeatherIcon from "react-native-vector-icons/Feather";
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS } from '../../Utils/theme';

const SECTIONS = [
    {
        title: 'How secure are cryptocurrencies?',
        content: 'Cryptocurrencies are generally considered secure due to the cryptographic technology they use. However, risks include hacking, scams, and human errors, such as losing private keys.',
    },
    {
        title: 'What is a stablecoin?',
        content: 'A stablecoin is a type of cryptocurrency that is designed to have a stable value, often pegged to a traditional currency like the US Dollar. Tether (USDT) and USD Coin (USDC) are examples.',
    },
    {
        title: 'Can I recover a lost private key?',
        content: 'No, if you lose your private key, you might lose access to your cryptocurrency holdings. There is no central authority to recover lost keys.',
    },
];

const ClassicAccordion = () => {

    const {colors} = useTheme();
    const [activeSections, setActiveSections] = useState([0]);
    const setSections = (sections) => {
        setActiveSections(
        sections.includes(undefined) ? [] : sections
        );
    };
    

    const AccordionHeader = (item, _, isActive) => {
        return(
            <View style={{
                flexDirection:'row',
                alignItems:'center',
                paddingVertical:12,
            }}>
                <View
                    style={{
                        height:26,
                        width:26,
                        borderRadius:26,
                        backgroundColor:COLORS.primary,
                        marginRight:12,
                        alignItems:'center',
                        justifyContent:'center',
                    }}
                >
                    <FeatherIcon size={16} color={COLORS.white} name={isActive ? 'minus' : 'plus'}/>
                </View>
                <Text style={[FONTS.font,FONTS.fontMedium,{color:colors.title,flex:1}]}>{item.title}</Text>
            </View>
        )
    }
    const AccordionBody = (item, _, isActive) => {
        return(
            <View style={{marginBottom:15,paddingLeft:38}}>
                <Text style={[FONTS.fontSm,{color:colors.text}]}>{item.content}</Text>
            </View>
        )
    }

    return (
        <>
            <Accordion
                sections={SECTIONS}
                duration={300}
                activeSections={activeSections}
                onChange={setSections}
                touchableComponent={TouchableOpacity}
                renderHeader={AccordionHeader}
                renderContent={AccordionBody}
            />
        </>
    );
};


export default ClassicAccordion;