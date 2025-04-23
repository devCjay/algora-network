import React, { useState, useRef } from "react";
import {
    Animated,
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
    RefreshControl,
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { SvgXml } from "react-native-svg";
import CustomButton from "../../components/CustomButton";
import { GlobalStyleSheet } from "../../Utils/styleSheet";
import { COLORS, FONTS, ICONS, SIZES, IMAGES } from "../../Utils/theme";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import RBSheet from "react-native-raw-bottom-sheet";
import FutureTrade from "../../components/BottomSheet/FutureTrade";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from "react-native-simple-radio-button";
import { useListUserOders } from "../../Api/orderApi";
import Header from "../../layout/header";


const OrderData = [
    {
        price: "0.6188",
        amount: "14.5k",
        length: '100%',
    },
    {
        price: "0.6109",
        amount: "8.009k",
        length: '75%',
    },
    {
        price: "0.68859",
        amount: "4.588k",
        length: '40%',
    },
    {
        price: "0.6188",
        amount: "14.5k",
        length: '50%',
    },
    {
        price: "0.6188",
        amount: "8.009k",
        length: '20%',
    },
    {
        price: "0.6188",
        amount: "4.588k",
        length: '45%',
    },
]

const OrderData2 = [
    {
        orderDate: '02-08-2022 5:30 pm',
        amount: '0.020000045',
        price: '294.70',
        orderType: 'Limit order',
    },
    {
        orderDate: '02-08-2022 5:30 pm',
        amount: '0.020000045',
        price: '294.70',
        orderType: 'Limit order',
    },
    {
        orderDate: '02-08-2022 5:30 pm',
        amount: '0.020000045',
        price: '294.70',
        orderType: 'Limit order',
    },
    {
        orderDate: '02-08-2022 5:30 pm',
        amount: '0.020000045',
        price: '294.70',
        orderType: 'Limit order',
    },
    {
        orderDate: '02-08-2022 5:30 pm',
        amount: '0.020000045',
        price: '294.70',
        orderType: 'Limit order',
    },
]

var radio_props = [
    { label: 'GTC', value: 0 },
    { label: 'IOC', value: 1 },
    { label: 'FOK', value: 2 }
];

const { width } = Dimensions.get('window');

function OrderScreen() {
    const navigation = useNavigation();
    const { colors } = useTheme();
    const theme = useTheme();

    const refRBSheet = useRef();
    const refSettingSheet = useRef();
    const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh

    const scrollX = useRef(new Animated.Value(0)).current;
    const buttons = ['Completed Orders', 'Pending Orders'];
    const onCLick = i => this.spotScrollView.scrollTo({ x: i * width });

    const [activeTab, setActiveTab] = useState('Buy');
    const [orderTab, setOrderTab] = useState('limit');
    const [isFocused, setisFocused] = useState(false);
    const [isFocused2, setisFocused2] = useState(false);
    const [isFocused3, setisFocused3] = useState(false);

    const [radioActive, setRadioActive] = useState(0);

    const { orderData } = useListUserOders();
    //console.log(orderData);

    // Filter orders by status
    //const pendingOrders = Array.isArray(orderData) ? orderData.filter(order => order.status === "pending") : [];
    //const completedOrders = Array.isArray(orderData) ? orderData.filter(order => order.status === "completed") : [];

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp * 1000); // Convert seconds to milliseconds

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
        const year = date.getFullYear();

        // const hours = String(date.getHours()).padStart(2, "0");
        // const minutes = String(date.getMinutes()).padStart(2, "0");
        // const seconds = String(date.getSeconds()).padStart(2, "0");

        return `${day}/${month}/${year}`;
    };

    const onRefresh = async () => {
        setRefreshing(true); // Start refreshing animation

        try {
            // Example: Fetch updated data or reset state
            console.log("Refreshing data...");
            await fetchData(); // Replace with your data-fetching logic
        } catch (error) {
            console.error("Error refreshing data:", error);
        }

        setRefreshing(false); // Stop refreshing animation
    };

    const fetchData = async () => {
        // Example: Fetch data or perform any updates
        console.log("Fetching updated data...");
    };




    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <Header leftIcon={'back'} title="My Order" />

            <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[COLORS.primary]} // Customize spinner color
                    />
                }
            >

                <View
                    style={{
                        height: 55,
                        backgroundColor: colors.background,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 20,
                        marginTop: 10,
                        marginBottom: 20,
                    }}
                >
                    <TouchableOpacity style={{ marginRight: 10 }}>
                        <Image
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: 'rgba(31, 71, 146, 0.8)',
                            }}
                            source={IMAGES.search}
                        />
                    </TouchableOpacity>
                    <TextInput
                        style={{
                            ...FONTS.fontLg,
                            color: COLORS.white,
                            flex: 1,
                            top: 1,
                        }}
                        placeholder="Search"
                        placeholderTextColor={'rgba(31, 71, 146, 0.8)'}
                    />

                </View>

                <ScrollView

                    horizontal
                    pagingEnabled
                    scrollEventThrottle={16}
                    scrollEnabled={false}
                    decelerationRate="fast"
                    showsHorizontalScrollIndicator={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false },
                    )}>

                    <View style={[styles.cardTab]} >
                        <View style={{ ...GlobalStyleSheet.container, paddingTop: 0 }}>
                            {orderData.length > 0 ? (
                                orderData.map((data, index) => (
                                    <View
                                        key={index}
                                        style={{
                                            borderWidth: 1,
                                            borderColor: colors.borderColor,
                                            backgroundColor: colors.background,
                                            paddingHorizontal: 15,
                                            paddingVertical: 14,
                                            borderRadius: SIZES.radiusLg,
                                            marginBottom: 8,
                                        }}
                                    >

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
                                            <Text style={{ ...FONTS.h6, ...FONTS.fontMedium, color: colors.title }}>Miner ID</Text>
                                            <Text style={{ ...FONTS.fontBold, color: colors.title }}>{data.id}</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ ...FONTS.font, color: colors.text, fontSize: 13 }}>Price</Text>
                                            <Text style={{ ...FONTS.fontSm, ...FONTS.fontMedium, color: colors.title }}>{data.price} USD</Text>
                                        </View>


                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
                                            <Text style={{ ...FONTS.h5, ...FONTS.fontMedium, color: COLORS.primary }}>Status</Text>



                                            {data.status === "Completed" ? (
                                                <Text style={{ ...FONTS.font, color: COLORS.success }}>Completed</Text>
                                            ) : (
                                                <Text style={{ ...FONTS.font, color: COLORS.warning }}>Waiting</Text>
                                            )}

                                        </View>

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ ...FONTS.font, color: colors.text, fontSize: 13 }}>Created on</Text>
                                            <Text style={{ ...FONTS.fontSm, ...FONTS.fontMedium, color: colors.title }}>{formatTimestamp(data.time_stamp)}</Text>
                                        </View>
                                    </View>


                                ))

                            ) : (
                                <View style={{
                                    borderWidth: 1,
                                    borderColor: colors.borderColor,
                                    backgroundColor: colors.background,
                                    paddingHorizontal: 15,
                                    paddingVertical: 14,
                                    borderRadius: SIZES.radiusLg,
                                    marginBottom: 8,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{ ...FONTS.font, color: colors.text }}>No Order Found</Text>
                                </View>
                            )}



                        </View>
                    </View>




                </ScrollView>


            </ScrollView>
        </SafeAreaView>
    )
}


function ButtonContainer({ buttons, onClick, scrollX }) {
    const [btnContainerWidth, setWidth] = useState(0);
    const btnWidth = btnContainerWidth / buttons.length;
    const translateX = scrollX.interpolate({
        inputRange: [0, width],
        outputRange: [0, btnWidth],
    });
    const translateXOpposit = scrollX.interpolate({
        inputRange: [0, width],
        outputRange: [0, -btnWidth],
    });
    const { colors } = useTheme();


    return (
        <View
            style={{ ...styles.btnContainer, backgroundColor: colors.bgLight }}
            onLayout={e => setWidth(e.nativeEvent.layout.width)}>
            {buttons.map((btn, i) => (
                <TouchableOpacity
                    key={btn}
                    style={styles.btn}
                    onPress={() => onClick(i)}>
                    <Text style={{ ...FONTS.font, color: colors.text }}>{btn}</Text>
                </TouchableOpacity>
            ))}
            <Animated.View
                style={[
                    styles.animatedBtnContainer,
                    { width: btnWidth, transform: [{ translateX }] },
                ]}>
                {buttons.map(btn => (
                    <Animated.View
                        key={btn}
                        style={[
                            styles.animatedBtn,
                            { width: btnWidth, transform: [{ translateX: translateXOpposit }] },
                        ]}>
                        <Text style={{ ...FONTS.font, color: COLORS.white }}>{btn}</Text>
                        <View
                            style={{
                                height: 45,
                                width: btnWidth,
                                backgroundColor: COLORS.primary,
                                position: 'absolute',
                                zIndex: -1,
                                bottom: 0,
                            }}
                        />
                    </Animated.View>
                ))}
            </Animated.View>
        </View>
    );
}


const styles = StyleSheet.create({
    tabBtn: {
        height: 48,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
    btnTabSmall: {
        height: 30,
        flex: 1,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
    },
    inputActive: {
        borderColor: COLORS.primary,
    },
    inputLabelRight: {
        ...FONTS.font,
        position: 'absolute',
        ...FONTS.fontMedium,
        right: 15,
        top: 12,
    },
    btnContainer: {
        height: 45,
        //overflow: 'hidden',
        flexDirection: 'row',
        width: '100%',
        borderRadius: 30,
    },
    btn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    animatedBtnContainer: {
        height: 45,
        flexDirection: 'row',
        position: 'absolute',
        overflow: 'hidden',
        borderRadius: 30,
    },
    animatedBtn: {
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnTextActive: {
        color: '#fff',
        fontWeight: 'bold',
    },
    cardTab: {
        width: width,
    },
    bglayer: {
        position: 'absolute',
        height: '100%',
        zIndex: -1,
    }
})

export default OrderScreen;