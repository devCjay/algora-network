import React, { useState, useEffect, useRef } from "react";
import {
    Text,
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
    SafeAreaView,
    Alert
} from "react-native";
import { useTheme, useNavigation } from '@react-navigation/native';
import { COLORS, FONTS, ICONS, IMAGES, SIZES } from "../../Utils/theme";
import { GlobalStyleSheet } from "../../Utils/styleSheet";
import CustomButton from "../../components/CustomButton";
import Header from "../../layout/header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CryptoQRCode from "../../Api/paymentApi";
import * as Clipboard from 'expo-clipboard';
import CountdownTimer from "../../components/CountdownTimer";
import Toast from "react-native-toast-message";
import SuccessSheet from "../../components/ActionSheet/SuccessSheet";
import SuccessModal from "../../components/Modal/SuccessModal";
import { Modal } from "react-native"; // Import Modal from React Native
import { removeExOrder } from "../../Api/paymentApi"; // Import the removeOrder function



const ExtendPayment = () => {

    const [isFocused, setIsFocused] = useState(false);
    const { colors } = useTheme();
    const [checkOrder, setCheckOrder] = useState(true);
    //const [myOrder, setMyOrder] = useState(null); // State to store order
    const navigation = useNavigation();

    const [myOrder, setMyOrder] = useState(null);
    const [payAddress, setPayAddress] = useState(''); // Store input value
    const [payAmount, setPayAmount] = useState('');

    const [payCurrency, setPayCurrency] = useState('');
    const [priceAmount, setPriceAmount] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');
    const [loading, setLoading] = useState(true); // Track loading state
    const [paystatus, setPayStatus] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false); // State to control modal visibility
    const timeoutIdRef = useRef(null); // Use a ref to store the timeout ID



    useEffect(() => {
        const fetchOrder = async () => {
            try {

                const order = await AsyncStorage.getItem("exOrder");

                if (order) {

                    const parsedOrder = JSON.parse(order);
                    setMyOrder(parsedOrder); // Save order
                    setPayAddress(parsedOrder.pay_address || ''); // Set input value
                    setPayAmount(parsedOrder.pay_amount || '');
                    setPayCurrency(parsedOrder.pay_currency || '');
                    setPriceAmount(parsedOrder.price_amount || '');
                    setPaymentStatus(parsedOrder.payment_status || '');


                    console.log(parsedOrder);

                } else {
                    console.log("No order found");
                    navigation.navigate('DrawerNavigation');
                }
            } catch (error) {
                console.error("Error retrieving the order:", error);
            }
            setCheckOrder(false);
        };
        fetchOrder();
    }, []);


    const handleExOrderStatus = async () => {
        if (myOrder) {
            console.log(myOrder.payment_status);

            if (myOrder.payment_status === "Completed") {
                setShowSuccessModal(true); // Show the modal

                // Redirect after 5 seconds
                timeoutIdRef.current = setTimeout(async () => {
                    setShowSuccessModal(false); // Hide the modal

                    try {
                        await removeExOrder(); // Remove order from AsyncStorage
                        console.log("Order removed successfully.");
                    } catch (error) {
                        console.error("Error removing order:", error);
                    }

                    navigation.navigate("DrawerNavigation"); // Redirect to another page
                }, 10000); // 5000ms = 5 seconds
            } else {
                setPayStatus(myOrder.payment_status); // Update payment status
            }
        }
    };

    useEffect(() => {
        handleExOrderStatus();

        // Cleanup function to clear timeout
        return () => {
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current);
                timeoutIdRef.current = null; // Reset the ref
            }
        };
    }, [myOrder]);






    // copy address
    const copyAddress = () => {
        Clipboard.setStringAsync(payAddress); // Copy to clipboard

        Toast.show({
            type: "success",
            text1: "Wallet address copied!",
            text2: "Make Payment",
        });
    };



    // copy Amount
    const copyAmount = () => {
        Clipboard.setStringAsync(payAmount); // Copy to clipboard

        Toast.show({
            type: "success",
            text1: "Amount copied!",
            text2: "Make Payment",
        });
    };

    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>

                <Header transparent leftIcon={'back'} title={paystatus} />
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ ...GlobalStyleSheet.container, flex: 1 }}>
                        <View
                            style={{
                                alignItems: 'center',
                                paddingVertical: 50,
                                justifyContent: 'center',
                                flex: 1,
                            }}
                        >

                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <CountdownTimer initialTime={2 * 60 * 60} />
                            </View>

                            <View
                                style={{
                                    height: 195,
                                    width: 185,
                                    borderRadius: 15,
                                    borderWidth: 1,
                                    borderColor: colors.borderColor,
                                    alignItems: 'center',
                                    backgroundColor: colors.background,
                                    justifyContent: 'center',
                                }}
                            >
                                <Image
                                    style={{
                                        height: 200,
                                        width: 195,
                                        resizeMode: 'contain',
                                        position: 'absolute',
                                        tintColor: COLORS.primary,
                                    }}
                                    source={IMAGES.qrarea}
                                />
                                <View
                                    style={{
                                        backgroundColor: COLORS.white,
                                        padding: 8,
                                        borderRadius: SIZES.radiusLg,
                                    }}
                                >
                                    <CryptoQRCode walletAddress={payAddress} orderAmount={payAmount} cryptoType={payCurrency} />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View
                        style={[GlobalStyleSheet.container, {
                            paddingHorizontal: 15,
                            paddingVertical: 15,
                            backgroundColor: colors.background,
                            borderTopLeftRadius: 25,
                            borderTopRightRadius: 25,
                            paddingTop: 25,
                        }]}
                    >
                        <View style={{ marginBottom: 15 }}>
                            <Text style={{ ...FONTS.fontSm, color: colors.primary, marginBottom: 6 }}>Wallet Address</Text>
                            <View style={{ marginBottom: 20 }}>
                                <TextInput
                                    style={[{
                                        ...GlobalStyleSheet.formControl,
                                        backgroundColor: colors.background,
                                        color: colors.title,
                                        borderColor: colors.borderColor,
                                        fontSize: 13,
                                    }, isFocused && styles.inputActive]}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    value={payAddress} // Bind input value to state
                                    editable={false} // Disable input
                                    placeholder="Fetching pay address..."
                                />
                                <TouchableOpacity
                                    onPress={copyAddress}
                                    style={{
                                        height: 36,
                                        width: 36,
                                        borderRadius: 36,
                                        backgroundColor: "rgba(255, 255, 255, 0.02)",
                                        borderWidth: 20,
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


                        <View style={{ marginBottom: 15 }}>
                            <Text style={{ ...FONTS.fontSm, color: colors.primary, marginBottom: 6 }}>Amount to Pay in {payCurrency}</Text>
                            <View style={{ marginBottom: 20 }}>
                                <TextInput
                                    style={[{
                                        ...GlobalStyleSheet.formControl,
                                        backgroundColor: colors.background,
                                        color: colors.title,
                                        borderColor: colors.borderColor,
                                        fontSize: 13,
                                    }, isFocused && styles.inputActive]}

                                    value={String(payAmount)} // Bind input value to state
                                    editable={false} // Disable input

                                />
                                <TouchableOpacity
                                    onPress={copyAmount}
                                    style={{
                                        height: 36,
                                        width: 36,
                                        borderRadius: 36,
                                        backgroundColor: "rgba(255,255,255,.02)",
                                        borderWidth: 20,
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






                        <CustomButton title="Contact Support" />

                    </View>
                </ScrollView>
            </SafeAreaView>

            {/* SuccessModal */}
            <Modal
                visible={showSuccessModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowSuccessModal(false)} // Close modal on back press
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center', // Center vertically
                        alignItems: 'center',    // Center horizontally
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add a semi-transparent background
                    }}
                >
                    <SuccessModal />
                </View>
            </Modal>

        </>
    );
};





const styles = StyleSheet.create({

    inputActive: {
        borderColor: COLORS.primary,
    },

})


export default ExtendPayment;
