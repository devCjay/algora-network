import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

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
    <View style={styles.container}>
      {isLoggingOut ? (
        <>
          <ActivityIndicator size="large" color="#007BFF" />
          <Text style={styles.loadingText}>Logging out...</Text>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
});

export default LogoutScreen;
