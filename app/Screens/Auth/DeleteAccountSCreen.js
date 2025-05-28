import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Image,
  Alert,
  Linking,
  Button

} from "react-native";
import { useTheme } from "@react-navigation/native";
import { GlobalStyleSheet } from "../../Utils/styleSheet";
import { COLORS, FONTS, IMAGES, ICONS } from "../../Utils/theme";
import CustomButton from "../../components/CustomButton";
import Header from "../../layout/header";
import { SvgXml } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { loginUser, deleteUserAccount } from "../../Api/authApi";
import Toast from "react-native-toast-message";
import SuccessModal from "./SuccessModal";
import * as Haptics from "expo-haptics";
import AccordionHighlight from "../../components/Accordion/AccordionHighlight";
import DeleteButton from "../../components/DeleteButton";



const DeleteAccountScreen = (props) => {
  const [isFocused, setisFocused] = useState(false);
  const [isFocused2, setisFocused2] = useState(false);
  const [handlePassword, setHandlePassword] = useState(true);
  const { colors } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  // check if user is authenticated

  // Handle delete account button press
  const handleDeleteAccount = async () => {
    // TODO: Implement delete account functionality
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            // Call the delete account API here
            deleteUserAccount()
              .then((response) => {
                if (response.success) {
                  Toast.show({
                    type: "success",
                    text1: "Account Deleted",
                    text2: "Your account has been successfully deleted.",
                  });

                  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

                  // Optionally navigate to a different screen or reset the navigation stack
                  navigation.replace("SignIn");
                } else {
                  Toast.show({
                    type: "error",
                    text1: "Deletion Failed",
                    text2: response.message || "Failed to delete account.",
                  });
                }
              })
              .catch((error) => {
                console.error("Delete account error:", error);
                Toast.show({
                  type: "error",
                  text1: "Error",
                  text2: "An error occurred while deleting your account.",
                });
              });
            
          },
        },
      ],
      { cancelable: false }
    );
  }     
    





  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.container}>

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1, paddingVertical: 25, paddingTop: 40 }}>
            <View style={GlobalStyleSheet.container}>
              <View style={{ alignItems: "center", marginBottom: 30 }}>
                <Text style={{ ...FONTS.h3, color: COLORS.danger, marginBottom: 5 }}>❌ Warning: </Text>
                <Text style={{ ...FONTS.h6, color: colors.title, marginBottom: 5 }}>You're About to Delete Your Algora Account</Text>
                <Text style={{ ...FONTS.fontSm, color: colors.text }}>Deleting your Algora Network account is a permanent action and cannot be undone.</Text>
                
              </View>

                <View style={{ marginBottom: 20 }}>
                <Text style={{ ...FONTS.fontLg, color: colors.text }}>By proceeding, you will lose access to:</Text>
                </View>
                

                <AccordionHighlight /> 

                <View style={{ marginTop: 10 }}>
                <Text style={{ ...FONTS.fontSm, color: colors.text }}>🔐 Your AGX tokens and mining progress are valuable. Are you sure you want to permanently delete your account?</Text>
                </View>

                

            </View>
          </View>


          <View style={[GlobalStyleSheet.container, { padding: 30, width: "100%" }]}>
            {loading ? (
              <View style={styles.buttonContainer}>
                <ActivityIndicator size="small" color="#fff" />
                <Text style={styles.loadingButtonText}>Logging in...</Text>
              </View>
            ) : (
              <DeleteButton title="Yes, Delete my account" onPress={handleDeleteAccount} disabled={loading} />
            )}


            <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "center", marginTop: 15 }}>
              <TouchableOpacity onPress={() => props.navigation.navigate("SignUp")}>
                <Text style={{ ...FONTS.font, color: COLORS.primary }}>Cancel Account Deletetion</Text>
              </TouchableOpacity>
            </View>

            <SuccessModal visible={modalVisible} onClose={() => setModalVisible(false)} />

          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputActive: {
    borderColor: COLORS.primary,
  },
  eyeIcon: {
    height: 48,
    width: 48,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    right: 0,
  },
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
});

export default DeleteAccountScreen;
