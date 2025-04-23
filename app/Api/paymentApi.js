import React from "react";
import { View, Text, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FONTS } from "../Utils/theme";
import { GlobalStyleSheet } from "../Utils/styleSheet";

// Mapping Crypto Types to QR Code URI Formats
const CRYPTO_SCHEMES = {
  btc: (addr, amt) => `bitcoin:${addr}?amount=${amt}`,
  eth: (addr, amt) => `ethereum:${addr}?value=${amt}`,
  ethbase: (addr, amt) => `ethereum:${addr}?value=${amt}`,
  sol: (addr, amt) => `solana:${addr}?amount=${amt}`,
  doge: (addr, amt) => `dogecoin:${addr}?amount=${amt}`,
  trx: (addr, amt) => `tron:${addr}?amount=${amt}`,
  usdttrc20: (addr, amt) => `tron:${addr}?amount=${amt}`,
  xmr: (addr, amt) => `monero:${addr}?tx_amount=${amt}`,
  bnbbsc: (addr, amt) => `bnb:${addr}?amount=${amt}`,
  usdtbsc: (addr, amt) => `bnb:${addr}?amount=${amt}`,
};

const CryptoQRCode = ({ walletAddress, orderAmount, cryptoType }) => {
  const qrValue =
    walletAddress && CRYPTO_SCHEMES[cryptoType]
      ? CRYPTO_SCHEMES[cryptoType](walletAddress, orderAmount || "0")
      : walletAddress || "invalid-address";

  return (
    <View style={{ alignItems: "center", margin: 5 }}>
      <Text style={{ ...FONTS.fontSm }}> Pay {orderAmount || "N/A"} {cryptoType?.toUpperCase() || "UNKNOWN"}</Text>
      <QRCode value={qrValue} size={110} backgroundColor="white" color="black" />
    </View>
  );
};


export default CryptoQRCode;


// Function to remove order data from AsyncStorage
export const removeOrder = async () => {
  try {
    await AsyncStorage.removeItem("newOrder");
    //console.log("Order removed successfully");
  } catch (error) {
    //console.error("Error removing order:", error);
  }
};


// Function to remove order data from AsyncStorage
export const removeExOrder = async () => {
  try {
    await AsyncStorage.removeItem("exOrder");
    //console.log("Order removed successfully");
  } catch (error) {
    //console.error("Error removing order:", error);
  }
};

// Function to remove order data from AsyncStorage
export const removeDeposit = async () => {
  try {
    await AsyncStorage.removeItem("newDeposit");
    //console.log("Deposit removed successfully");
  } catch (error) {
    //console.error("Error removing Deposit:", error);
  }
};
