import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS, SIZES } from '../../Utils/theme';

const SECTIONS = [
    {
        title: 'What is cryptocurrency?',
        content: 'Cryptocurrency is a type of digital or virtual currency that uses cryptography for security. It operates on decentralized technology called blockchain, which ensures secure and transparent transactions.',
    },
    {
        title: 'How does cryptocurrency work?',
        content: 'Cryptocurrencies work on blockchain technology, which is a distributed and decentralized ledger. Transactions are verified by network participants through cryptography and added to the blockchain as blocks.',
    },
    {
        title: 'Which was the first cryptocurrency?',
        content: 'Bitcoin (BTC) was the first cryptocurrency, created by an unknown person or group using the pseudonym Satoshi Nakamoto in 2009.',
    },
];

const AccordionHighlight = () => {

    const theme = useTheme();

    const {colors} = theme;

    const [activeSections, setActiveSections] = useState([0]);
    const setSections = (sections) => {
        setActiveSections(
        sections.includes(undefined) ? [] : sections
        );
    };
    

    const AccordionHeader = (item, index, isActive) => {
        return(
            <View style={{
                flexDirection:'row',
                alignItems:'center',
                paddingVertical:12,
                paddingHorizontal:15,
                borderRadius:SIZES.radius,
                backgroundColor: isActive ? COLORS.primary : COLORS.primaryLight,
            }}>
                <View
                    style={{
                        height:28,
                        width:28,
                        borderRadius:28,
                        backgroundColor:isActive ? 'rgba(255,255,255,1)' : theme.dark ? colors.borderColor : COLORS.white,
                        marginLeft:-5,
                        marginRight:10,
                        marginVertical:-2,
                        alignItems:'center',
                        justifyContent:'center',
                    }}
                >
                    <Text style={[FONTS.font,FONTS.fontSemiBold,{color:isActive ? COLORS.primary : colors.title,lineHeight:16}]}>{index+1}</Text>
                </View>
                <Text style={[FONTS.font,FONTS.fontMedium,{color:isActive ? COLORS.white : colors.title,flex:1}]}>{item.title}</Text>
                <FontAwesome name={isActive ? 'angle-up' : 'angle-down'} size={20} color={isActive ? COLORS.white : colors.title}/>
            </View>
        )
    }
    const AccordionBody = (item, _, isActive) => {
        return(
            <View style={{marginBottom:15,marginTop:10,paddingHorizontal:15}}>
                <Text style={[FONTS.fontSm,{color:colors.text}]}>{item.content}</Text>
            </View>
        )
    }

    return (
        <>
            <Accordion
                sections={SECTIONS}
                sectionContainerStyle={{marginBottom:8}}
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


export default AccordionHighlight;