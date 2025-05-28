import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS, SIZES } from '../../Utils/theme';

const SECTIONS = [
    {
        title: 'Your AGX token balance',
        content: 'All AGX tokens mined up to this point will be permanently deleted along with your account. You will not be able to transfer, withdraw, or recover these tokens at any point in the future.',
    },
    {
        title: 'Ongoing mining progress',
        content: 'All ongoing mining progress will be permanently deleted. You will not be able to recover any mined tokens or continue mining after account deletion.',
    },
    {
        title: 'Your referral and rewards history',
        content: 'All referral and rewards history will be permanently deleted. You will not be able to recover any past referrals or rewards associated with your account.',	
    },

    ,
    {
        title: 'All associated account data',
        content: 'All personal data associated with your account, including your email address, will be permanently deleted. This means you will not be able to log in or recover your account in the future.',
    },

    ,
    {
        title: 'Any future benefits from Algora promotions',
        content: 'All future benefits from Algora promotions, including any potential airdrops or rewards, will be permanently forfeited. You will not be eligible for any future promotions or benefits associated with your account.',
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