import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS, IMAGES, SIZES } from '../../Utils/theme';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useEarnings } from '../../Api/userApi'; // Import the custom hook

import {
    LineChart
} from "react-native-chart-kit";
import Svg, { Rect , Text as TextSVG } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';


const hourData = [50,80,50,90,60,80]
const weekData = [60,80,60,40,50,80,30,90,70,100]
const monthData = [50,80,50,60,90,70,100]
const yearData = [20,50,20,60,40,60,80]
const allData = [50,80,50,90,60,80,60,90,70,100]

const BalanceChart = (props) => {

    const {colors} = useTheme();
    const { earnings } = useEarnings();


    let [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, visible: false, value: 0 })

    const [status , setStatus] = useState('All');
    const [chartData , setChartdata] = useState(allData);

    const setChartStatusFilter = status => {
        switch(status){
            case "24H":
                setChartdata(hourData);
                break;
            case "1W":
                setChartdata(weekData);
                break;
            case "1M":
                setChartdata(monthData);
                break;
            case "1Y":
                setChartdata(yearData);
                break; 
            case "All":
                setChartdata(allData);
                break;
        }
        setStatus(status)
    }

    return (
        <>
        
            <View
                style={[{
                    paddingHorizontal:15,
                    paddingVertical:20,
                    backgroundColor:colors.background,
                },
                props.home && {
                    paddingBottom:55,
                }
                ]}
            >
                <View
                    style={{
                        flexDirection:'row',
                        alignItems:'center',
                    }}
                >
                    <LinearGradient
                        colors={["rgb(9, 35, 97)","rgb(20, 89, 247)"]}
                        style={{
                            height:38,
                            width:38,
                            borderRadius:38,
                            backgroundColor:COLORS.primary,
                            alignItems:'center',
                            justifyContent:'center',
                            marginRight:8,
                        }}
                    >
                        <Image
                            style={{
                                tintColor:COLORS.white,
                                height:22,
                                width:22,
                                resizeMode:'contain',
                            }}
                            source={IMAGES.wallet}
                        />
                    </LinearGradient>
                    <View>
                        <Text style={{...FONTS.fontSm,color:colors.text,marginBottom:6,marginTop:2}}>AGX Balance</Text>
                        <View
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                            }}
                        >
                            <Text style={{...FONTS.h3,color:colors.title,...FONTS.fontMedium}}>{earnings}</Text>
                            <Text style={{...FONTS.fontSm,color:COLORS.success,marginLeft:6}}>~ {(earnings * 0.0075).toFixed(2)} USD</Text>
                        </View>
                    </View>
                </View>

                <View
                    style={{
                        marginLeft:-18,
                        marginTop:15,
                    }}
                >
                    
                </View>
                
            </View>

            

        </>
    );
};

const styles = StyleSheet.create({
    tabBtn:{
        paddingHorizontal:15,
        paddingVertical:4,
        alignItems:'center',
        borderRadius:6,
        marginHorizontal:3,
        borderWidth:1,
    },
})

export default BalanceChart;