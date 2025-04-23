import React, {useState} from 'react';
import { LayoutAnimation, SafeAreaView, ScrollView, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/header';
import SwipeBox from '../../components/SwipeBox';
import { IMAGES } from '../../Utils/theme';
import { GlobalStyleSheet } from '../../Utils/styleSheet';

const SwipeData = [
    {
        id : "1",
        icon : IMAGES.bitcoin,
        coin : "Bitcoin",
        amount : "0.154836",
        rate : "+4.6%",
        subTitle : 'BTC  $8,456.87',
    },
    {
        id : "2",
        icon : IMAGES.etherium,
        coin : "Etherium",
        amount : "0.154836",
        rate : "+4.6%",
        subTitle : 'BTC  $8,456.87',
    },
    {
        id : "3",
        icon : IMAGES.litherium,
        coin : "LTC",
        amount : "0.154836",
        rate : "+4.6%",
        subTitle : 'BTC  $8,456.87',
    },
        {
        id : "4",
        icon : IMAGES.bitcoin,
        coin : "Bitcoin",
        amount : "0.154836",
        rate : "+4.6%",
        subTitle : 'BTC  $8,456.87',
    },
    {
        id : "5",
        icon : IMAGES.bitcoin,
        coin : "Bitcoin",
        amount : "0.154836",
        rate : "+4.6%",
        subTitle : 'BTC  $8,456.87',
    },
    {
        id : "6",
        icon : IMAGES.etherium,
        coin : "Etherium",
        amount : "0.154836",
        rate : "+4.6%",
        subTitle : 'BTC  $8,456.87',
    },
    {
        id : "7",
        icon : IMAGES.litherium,
        coin : "LTC",
        amount : "0.154836",
        rate : "+4.6%",
        subTitle : 'BTC  $8,456.87',
    },
        {
        id : "8",
        icon : IMAGES.bitcoin,
        coin : "Bitcoin",
        amount : "0.154836",
        rate : "+4.6%",
        subTitle : 'BTC  $8,456.87',
    },
]
const SwipeableScreen = () => {

    const {colors} = useTheme();
    const [lists, setLists] = useState(SwipeData);

    const deleteItem = (index) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
        const arr = [...lists];
        arr.splice(index, 1);
        setLists(arr);
    };
    return (
        <SafeAreaView style={{
            flex:1,
            backgroundColor:colors.background,
        }}>
            <Header
                leftIcon={'back'}
                title ={'Swipeable'}
                titleLeft
            />
            <GestureHandlerRootView style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{paddingVertical:15}} showsHorizontalScrollIndicator={false}>
                    <View
                        style={[GlobalStyleSheet.container,{padding:0}]}
                    >
                        {lists.map((data,index) => {
                            return(
                                <View
                                    key={index}
                                >
                                    <SwipeBox colors={colors} data={data} handleDelete={() => deleteItem(index)} />
                                    <View
                                        style={{
                                            height:1,
                                            width:'100%',
                                            backgroundColor:colors.borderColor,
                                        }}
                                    />
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
            </GestureHandlerRootView>

        </SafeAreaView>
    );
};

export default SwipeableScreen;
