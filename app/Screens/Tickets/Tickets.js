import React, { useState, useEffect } from "react";
import { Image, Text, View, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation, useTheme } from '@react-navigation/native';
import { COLORS, FONTS, IMAGES } from '../../Utils/theme';
import { GlobalStyleSheet } from "../../Utils/styleSheet";
import Button from "../../components/Button/Button";
import Divider from '../../components/Dividers/Divider';
import CustomButton from "../../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllRaffles } from "../../Api/raffleApi";


const Tickets = () => {

  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [raffle_id, setRaffleId] = useState("");
  const [amount, setAmount] = useState("");
  const navigation = useNavigation();
  const [raffles, setRaffles] = useState([]); // State to store raffles data
  const [globalLoading, setGlobalLoading] = useState(false); // Global loading state for fetching raffles
  const [loadingButtonId, setLoadingButtonId] = useState(null); // Track which button is loading

  // Fetch raffles when the component mounts
  useEffect(() => {
    const fetchRaffles = async () => {
      setGlobalLoading(true);
      const result = await getAllRaffles();
      setGlobalLoading(false);

      if (result.success) {
        setRaffles(result.data); // Store raffles data in state
      } else {
        Alert.alert("Error", result.error || "Failed to fetch raffles.");
      }
    };

    fetchRaffles();
  }, []);


  console.log(raffles); // Log the raffles data to check if it's being fetched correctly

  const handleSubmit = async (raffleId) => {
    console.log("Raffle ID:", raffleId); // Log the raffle_id
    if (!raffleId) {
      Alert.alert("Error", "Invalid Raffle ID.");
      return;
    }

    setLoadingButtonId(raffleId); // Set the loading state for the specific button

    try {
      await AsyncStorage.setItem("ticketId", JSON.stringify(raffleId)); // Store the raffle_id
      console.log("Stored ticketId in AsyncStorage:", raffleId); // Log the stored value
      navigation.navigate("TicketDetails"); // Navigate to TicketDetails screen
    } catch (error) {
      console.error("Error storing ticketId:", error);
      Alert.alert("Error", "Failed to store ticket ID.");
    }

    setLoadingButtonId(null); // Reset the loading state for the button
  };


  const Data = [
    'Ticket Price:',
    'Total Tickets',
    'Partiscipants',
  ]

  return (
    <>


      {raffles.length === 0 ? (
        // Show this view if raffles array is empty
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Text style={{ ...FONTS.h4, color: colors.title, textAlign: "center" }}>
            No raffles available at the moment.
          </Text>
        </View>
      ) : (
        // Map raffles if the array is not empty
        raffles.map((item, index) => (
          <View
            key={index} // Add a unique key for each item
            style={{
              padding: 30,
              paddingTop: 60,
              position: "relative",
              marginTop: 50,
              borderRadius: 0,
              backgroundColor: colors.background,
              borderWidth: 1,
              borderColor: colors.borderColor,
              maxWidth: 320,
              width: "100%",
              shadowColor: "rgba(0,0,0,.6)",
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.3,
              shadowRadius: 4.65,
              elevation: 8,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: colors.background,
                  position: "absolute",
                  top: -100,
                  borderWidth: 1,
                  borderColor: colors.borderColor,
                  shadowColor: "rgba(0,0,0,.6)",
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 4.65,
                  elevation: 8,
                }}
              >
                <Image
                  style={{
                    height: 44,
                    width: 44,
                  }}
                  source={IMAGES.star}
                />
              </View>
            </View>
            <View style={{ alignItems: "center", marginBottom: 25 }}>
              <Text style={{ ...FONTS.h4, color: colors.title, marginBottom: 5 }}>
                {item.name || `Raffle #${index + 1}`}
              </Text>

              <View style={{ flexDirection: "row", alignItems: "flex-end", marginBottom: 5 }}>
                <Text style={{ ...FONTS.h2, lineHeight: 35, color: colors.title }}>
                  {item.price_pool || "30"} USD
                </Text>
                <Text
                  style={{
                    ...FONTS.font,
                    ...FONTS.fontBold,
                    fontSize: 16,
                    color: colors.title,
                    marginBottom: 5,
                    marginLeft: 3,
                  }}
                >
                  / Price Pool
                </Text>
              </View>
            </View>

            <Divider />

            <View style={GlobalStyleSheet.container}>
              {loadingButtonId === item.id ? (
                <View style={styles.buttonContainer}>
                  <ActivityIndicator size="small" color="#fff" />
                  <Text style={styles.loadingButtonText}>Loading...</Text>
                </View>
              ) : (
                <CustomButton
                  title="Join Raffle"
                  onPress={() => {
                    handleSubmit(item.id); // Pass item.id directly
                  }}
                  disabled={loadingButtonId !== null} // Disable all buttons while one is loading
                />
              )}
            </View>
          </View>
        ))
      )}




    </>
  );
};



const styles = StyleSheet.create({

  loadingContainer: {
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
  buttonContainer: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 5,
    opacity: 0.7,
  },
  loadingButtonText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 16,
  },

  buttonContainer: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 5,
    opacity: 0.7,
  },
  loadingButtonText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 16,
  },

})



export default Tickets;