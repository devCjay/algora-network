import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import { Image, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Header from "../../layout/header";
import { GlobalStyleSheet } from "../../Utils/styleSheet";
import { COLORS, FONTS, IMAGES, SIZES } from "../../Utils/theme";
import BalanceChart from "../../components/chart/BalanceChart";
import { LinearGradient } from 'expo-linear-gradient';
import { useRefarral, useUserData } from '../../Api/userApi'; // Import the custom hook
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-toast-message';




function ReferralScreen() {

    const [isFocused, setisFocused] = useState(false);
    const [isFocused2, setisFocused2] = useState(false);
    const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh


    const { colors } = useTheme();
    const { data, userRefCount, totalAmount } = useRefarral();
    //console.log(data);
    const { username } = useUserData();
    //const [refLink, setRefLink] = useState(`https://algora.network/sign-up/${username}`); // State for referral link
    const refLink = `https://algora.network/sign-up/${username}`; // Example referral link  

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp * 1000); // Convert seconds to milliseconds

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
        const year = date.getFullYear();

        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");

        return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
    };


    // Example usage
    //const timestamp = 1710961529000; // Example timestamp (milliseconds)
    //console.log(formatTimestamp(timestamp)); // Output: "20/03/2025, 23:25:29"


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

    // copy address
    const copyReflink = () => {
        Clipboard.setStringAsync(username); // Copy to clipboard

        Toast.show({
            type: "success",
            text1: "Referral code copied!",
        });
    };




    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>

            <View
                style={{
                    flex: 1,
                    backgroundColor: colors.ThemeBg,
                }}
            >
                <Header leftIcon={'back'} title="Referral" />
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 80 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={[COLORS.primary]} // Customize spinner color
                        />
                    }
                >
                    <View
                        style={[GlobalStyleSheet.container, {
                            flexDirection: 'row',
                            paddingHorizontal: 15,
                            marginTop: 40,
                            marginBottom: 10,
                        }]}
                    >



                        <View
                            style={{
                                backgroundColor: colors.background,
                                flex: 1,
                                paddingHorizontal: 15,
                                alignItems: 'center',
                                paddingVertical: 15,
                                borderRadius: SIZES.radius,
                                marginRight: 5,
                                borderWidth: 1,
                                borderColor: colors.borderColor,
                            }}
                        >
                            <LinearGradient
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                colors={["rgb(9, 35, 97)", "rgb(20, 89, 247)"]}
                                style={{
                                    height: 45,
                                    width: 45,
                                    borderRadius: 45,
                                    borderRadius: 45,
                                    marginTop: -35,
                                    marginBottom: 12,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Image
                                    style={{
                                        height: 18,
                                        width: 18,
                                        tintColor: COLORS.white,
                                    }}
                                    source={IMAGES.wallet2}
                                />
                            </LinearGradient>
                            <Text style={{ ...FONTS.h6, color: colors.title, marginBottom: 2 }}>{totalAmount} USD</Text>
                            <Text style={{ ...FONTS.font, color: colors.text }}>Total Income</Text>
                        </View>
                        <View
                            style={{
                                backgroundColor: colors.background,
                                flex: 1,
                                paddingHorizontal: 15,
                                alignItems: 'center',
                                paddingVertical: 15,
                                borderRadius: SIZES.radius,
                                marginLeft: 5,
                                borderWidth: 1,
                                borderColor: colors.borderColor,
                            }}
                        >
                            <LinearGradient
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                colors={["rgb(9, 35, 97)", "rgb(20, 89, 247)"]}
                                style={{
                                    height: 45,
                                    width: 45,
                                    borderRadius: 45,
                                    borderRadius: 45,
                                    marginTop: -35,
                                    marginBottom: 12,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Image
                                    style={{
                                        height: 22,
                                        width: 22,
                                        tintColor: COLORS.white,
                                    }}
                                    source={IMAGES.referral}
                                />
                            </LinearGradient>
                            <Text style={{ ...FONTS.h6, color: colors.title, marginBottom: 2 }}>{userRefCount}</Text>
                            <Text style={{ ...FONTS.font, color: colors.text }}>Total Referral</Text>
                        </View>
                    </View>



                    <View
                        style={{
                            ...GlobalStyleSheet.container,
                            marginTop: 5,
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: colors.bgLight,
                                borderRadius: SIZES.radius,
                                paddingHorizontal: 15,
                                paddingTop: 18,
                                borderWidth: 1,
                                borderColor: colors.borderColor,
                            }}
                        >
                            <Text style={{ ...FONTS.h6, color: colors.title, marginBottom: 15, lineHeight: 24 }}>Share your referral code and earn AGX.</Text>


                            <Text style={{ ...FONTS.fontSm, color: colors.text, marginBottom: 6 }}>Your Referral code</Text>
                            <View style={{ marginBottom: 20 }}>
                                <TextInput
                                    style={[{
                                        ...GlobalStyleSheet.formControl,
                                        backgroundColor: colors.background,
                                        color: COLORS.primary,
                                        ...FONTS.fontMedium,
                                        borderColor: colors.borderColor,
                                        fontSize: 14,
                                    }, isFocused2 && styles.inputActive]}
                                    onFocus={() => setisFocused2(true)}
                                    onBlur={() => setisFocused2(false)}
                                    value={username}
                                    editable={false} // Disable input
                                />
                                <TouchableOpacity
                                    onPress={copyReflink}
                                    style={{
                                        height: 36,
                                        width: 36,
                                        borderRadius: 36,
                                        backgroundColor: "rgba(255,255,255,.02)",
                                        borderWidth: 1,
                                        borderColor: colors.borderColor,
                                        position: 'absolute',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        right: 6,
                                        top: 6,
                                    }}
                                >
                                    <Image
                                        style={{
                                            height: 18,
                                            width: 18,
                                            tintColor: COLORS.primary
                                        }}
                                        source={IMAGES.copy}
                                    />
                                </TouchableOpacity>
                            </View>

                        </View>

                    </View>


                    <View style={GlobalStyleSheet.container}>
                        <Text style={{ ...FONTS.h6, color: colors.title, marginBottom: 12 }}>Referred Users</Text>

                        <View
                            style={{
                                backgroundColor: colors.background,
                                height: 40,
                                borderRadius: SIZES.radius,
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderWidth: 1,
                                borderColor: colors.borderColor,
                                marginBottom: 3,
                            }}
                        >
                            <Text style={{ ...styles.thItem, flex: 1, color: colors.title }}>User</Text>
                            <Text style={{ ...styles.thItem, flex: 1, color: colors.title }}>Earnings</Text>
                            <Text style={{ ...styles.thItem, flex: 1, color: colors.title }}>Status</Text>
                            <Text style={{ ...styles.thItem, flex: 1, textAlign: 'right', color: colors.title }}>Reg Date</Text>
                        </View>

                        {data.length === 0 ? (
                            <View style={{ padding: 10, alignItems: 'center' }}>
                                <Text style={{ ...FONTS.font, color: colors.text }}>No referrals yet.</Text>
                            </View>

                        ) : (
                            data.map((item, index) => {
                                return (
                                    <View
                                        key={index}
                                        style={{
                                            flexDirection: 'row',
                                        }}
                                    >
                                        <Text style={{ ...styles.tbItem, color: colors.title, fontSize: 12 }}>{item.username}</Text>
                                        <Text style={{ ...styles.tbItem, color: colors.title, flex: 1, fontSize: 12 }}>{item.earnings.toFixed(2)} USD</Text>
                                        <Text style={{ ...styles.tbItem, color: COLORS.success, flex: 1, fontSize: 12 }}>REGISTERED</Text>
                                        <Text style={{ ...styles.tbItem, color: colors.title, flex: 1, textAlign: 'right', fontSize: 12 }}>{formatTimestamp(item.timestamp)}</Text>
                                    </View>
                                );
                            })
                        )}

                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    inputActive: {
        borderColor: COLORS.primary,
    },
    card: {
        padding: 12,
        borderRadius: SIZES.radius,
        marginBottom: 10,
        borderWidth: 1,
        shadowColor: "rgba(0,0,0,.5)",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },
    listView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 1,
    },
    tbItem: {
        ...FONTS.font,
        paddingHorizontal: 8,
        paddingVertical: 8,
    },
    thItem: {
        ...FONTS.fontSm,
        ...FONTS.fontSemiBold,
        paddingHorizontal: 8,
    }

})

export default ReferralScreen;