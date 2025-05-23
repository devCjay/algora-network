import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text, StyleSheet, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyleSheet } from "../../Utils/styleSheet";
import { COLORS, FONTS, IMAGES, ICONS } from "../../Utils/theme";

const LogoutScreen = () => {
  const navigation = useNavigation();
  const [isLoggingOut, setIsLoggingOut] = useState(true);

  useEffect(() => {
    const logout = async () => {
      try {
        await AsyncStorage.removeItem("userToken");
        await AsyncStorage.removeItem("userEmail");
        setTimeout(() => {
          setIsLoggingOut(false);
          navigation.replace("SignIn");
        }, 1500); // Add delay for a smooth transition
      } catch (error) {
        console.error("Logout Error:", error);
        setIsLoggingOut(false);
      }
    };
    logout();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#020e52" }}>
    <View style={styles.container}>
      {isLoggingOut ? (
        <>
          <ActivityIndicator size="large" color="#007BFF" />
          <Text style={styles.loadingText}>Logging out...</Text>
        </>
      ) : null}
    </View>
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#020e52",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#fff",
  },
});

export default LogoutScreen;
