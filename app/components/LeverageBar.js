import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Image, View } from 'react-native';
import { COLORS } from '../Utils/theme';

const happy = require('../assets/images/emoji/happy.png');
const smile = require('../assets/images/emoji/smile.png');
const wow = require('../assets/images/emoji/wow.png');
const sad = require('../assets/images/emoji/sad.png');
const cry = require('../assets/images/emoji/cry.png');
const shock = require('../assets/images/emoji/shock.png');

const LeverageData = [
    {
        icon : happy,
        type : "happy",
        backgroundColor : COLORS.success,
    },
    {
        icon : smile,
        type : "smile",
        backgroundColor : COLORS.success,
    },
    {
        icon : wow,
        type : "wow",
        backgroundColor : COLORS.success,
    },
    {
        icon : sad,
        type : "sad",
        backgroundColor : "#EFD430",
    },
    {
        icon : cry,
        type : "cry",
        backgroundColor : "#EFD430",
    },
    {
        icon : shock,
        type : "shock",
        backgroundColor : COLORS.danger,
    },
]

const LeverageBar = ({reaction}) => {

    const {colors} = useTheme();

    return (
        <>
            <View style={{
                height:11,
                borderRadius:5,
                backgroundColor:  colors.cardbackground,
                flexDirection:'row',
                alignItems:'center',

                shadowColor: "rgba(0,0,0,.2)",
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 0.34,
                shadowRadius: 6.27,

                elevation: 10,
            }}>
                {LeverageData.map((data,index) => {
                    return(
                        <View
                            key={index}
                            style={{
                                flex: index == 0 ? 0 : 1,
                                height:5,
                                justifyContent:'center',
                                alignItems:'flex-end',
                                backgroundColor: data.backgroundColor ? data.backgroundColor : '#DEE5EF',
                            }}
                        >

                            <View
                                style={{
                                    height:20,
                                    width:20,
                                    padding:2,
                                    borderRadius:10,
                                    backgroundColor:colors.cardbackground,

                                    shadowColor: "rgba(0,0,0,.4)",
                                    shadowOffset: {
                                        width: 0,
                                        height: 4,
                                    },
                                    shadowOpacity: 0.30,
                                    shadowRadius: 4.65,

                                    elevation: 8,
                                }}
                            >
                                <Image
                                    style={{
                                        height:'100%',
                                        width:'100%',
                                        borderRadius:10,
                                    }}
                                    source={data.icon}
                                />
                            </View>
                        </View>
                    )
                })}
            </View>
        </>
    );
};


export default LeverageBar;