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
import { loginUser, checkAuthStatus } from "../../Api/authApi";
import Toast from "react-native-toast-message";
import SuccessModal from "./SuccessModal";
import * as Haptics from "expo-haptics";


const SignIn = (props) => {
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

  useEffect(() => {
    const checkUser = async () => {
      const isAuthenticated = await checkAuthStatus();
      if (isAuthenticated) {
        navigation.replace("DrawerNavigation");
      }
    };
    checkUser();
  }, []);


  const handleLogin = async () => {

    // **✅ Input Validation**
    if (!email.trim() || !password.trim()) {
      Toast.show({
        type: "error",
        text1: "Missing Fields",
        text2: "Please enter both email and password.",
      });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return; // Stop execution if fields are empty
    }


    setLoading(true);
    const result = await loginUser(email, password);
    setLoading(false);


    if (result.success) {

      Toast.show({
        type: "success",
        text1: "Login Successful",
        text2: "Welcome back!",
      });

      navigation.replace("DrawerNavigation"); // Navigate after success
    } else {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: "Invalid credentials",
      });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }


  };



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.container}>

        <View style={{ flex: 1, paddingTop: 20, paddingLeft: 20 }}>
          <Image style={{ height: 18, width: 75, tintColor: colors.title }} source={IMAGES.logoImg} />
        </View>


        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1, paddingVertical: 25, paddingTop: 100 }}>
            <View style={GlobalStyleSheet.container}>
              <View style={{ alignItems: "center", marginBottom: 30 }}>
                <Text style={{ ...FONTS.h3, color: colors.title, marginBottom: 5 }}>Login Account</Text>
                <Text style={{ ...FONTS.fontLg, color: colors.text }}>Login to your Algora Account</Text>
              </View>
              <Text style={{ ...FONTS.font, color: colors.title, marginBottom: 8 }}>Email address</Text>
              <View style={{ marginBottom: 20 }}>
                <TextInput
                  style={[
                    GlobalStyleSheet.formControl,
                    {
                      backgroundColor: colors.inputBg,
                      color: colors.title,
                      borderColor: colors.borderColor,
                    },
                    isFocused && styles.inputActive,
                  ]}
                  onFocus={() => setisFocused(true)}
                  onBlur={() => setisFocused(false)}
                  placeholderTextColor={colors.text}
                  placeholder="Enter email"
                  value={email}
                  onChangeText={setEmail}
                  editable={!loading}
                />
              </View>
              <Text style={{ ...FONTS.font, color: colors.title, marginBottom: 8 }}>Password</Text>
              <View style={{ marginBottom: 15 }}>
                <TextInput
                  style={[
                    GlobalStyleSheet.formControl,
                    {
                      backgroundColor: colors.inputBg,
                      color: colors.title,
                      borderColor: colors.borderColor,
                    },
                    isFocused2 && styles.inputActive,
                  ]}
                  onFocus={() => setisFocused2(true)}
                  onBlur={() => setisFocused2(false)}
                  placeholderTextColor={colors.text}
                  placeholder="Enter password"
                  secureTextEntry={handlePassword}
                  value={password}
                  onChangeText={setPassword}
                  editable={!loading}
                />

                <TouchableOpacity style={styles.eyeIcon} onPress={() => setHandlePassword(!handlePassword)}>
                  <SvgXml height={24} width={24} fill={colors.text} xml={handlePassword ? ICONS.eyeOpen : ICONS.eyeClose} />
                </TouchableOpacity>
              </View>

              <View style={{ alignItems: "flex-end", marginBottom: "18%" }}>
                <TouchableOpacity onPress={() => Linking.openURL('https://algora.network/login')}>
                  <Text style={{ ...FONTS.font, color: COLORS.primary }}>Forgot password?</Text>
                </TouchableOpacity>
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
              <CustomButton title="Login" onPress={handleLogin} disabled={loading} />
            )}


            <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "center", marginTop: 15 }}>
              <TouchableOpacity onPress={() => props.navigation.navigate("SignUp")}>
                <Text style={{ ...FONTS.font, color: COLORS.primary }}>Register</Text>
              </TouchableOpacity>
              <Text style={{ ...FONTS.font, color: colors.title }}> for Free</Text>
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

export default SignIn;
