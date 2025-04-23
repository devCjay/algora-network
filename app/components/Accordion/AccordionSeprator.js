import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS, IMAGES } from '../../Utils/theme';

const SECTIONS = [
    {
        icon : IMAGES.pay,
        title: 'How do I buy cryptocurrencies?',
        content: 'You can buy cryptocurrencies through online exchanges using traditional currency or other cryptocurrencies. Popular exchanges include Coinbase, Binance, and Kraken.',
    },
    {
        icon : IMAGES.verification,
        title: 'Are cryptocurrencies legal?',
        content: "Cryptocurrency legality varies by country. Some countries have embraced them, while others have imposed restrictions or bans. It's essential to research the laws in your jurisdiction.",
    },
    {
        icon : IMAGES.referral2,
        title: 'What are private and public keys?',
        content: 'Private keys are secret codes that grant access to your cryptocurrency holdings. Public keys are addresses you share with others to receive funds.',
    },
];

const AccordionSeprator = (props) => {

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
                <Image
                    source={item.icon}
                    style={{
                        height:20,
                        width:20,
                        resizeMode:'contain',
                        tintColor:COLORS.primary,
                        marginRight:12,
                    }}
                />
                <Text style={[FONTS.font,FONTS.fontMedium,{color:colors.title,flex:1}]}>{item.title}</Text>
                <FontAwesome name={isActive ? 'angle-up' : 'angle-down'} size={20} color={colors.title}/>
            </View>
        )
    }
    const AccordionBody = (item, _, isActive) => {
        return(
            <View style={{marginBottom:15}}>
                <Text style={[FONTS.fontSm,{color:colors.text}]}>{item.content}</Text>
            </View>
        )
    }

    return (
        <>
            <Accordion
                sections={SECTIONS}
                sectionContainerStyle={{
                    borderBottomWidth:1,
                    borderColor:colors.borderColor,
                }}
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


export default AccordionSeprator;