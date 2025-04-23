import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from "../../Utils/styleSheet";
import { COLORS, FONTS, ICONS, IMAGES } from "../../Utils/theme";
import CustomButton from "../../components/CustomButton";
import Header from "../../layout/header";
import { SvgXml } from "react-native-svg";
import { Checkbox } from "react-native-paper";
import { registerUser } from "../../Api/authApi";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import * as Haptics from "expo-haptics";
import AsyncStorage from '@react-native-async-storage/async-storage';


const SignUp = (props) => {

  const [isFocused, setisFocused] = useState(false);
  const [isFocused2, setisFocused2] = useState(false);
  const [isFocused4, setisFocused4] = useState(false);
  const [isFocused5, setisFocused5] = useState(false);
  const [handlePassword, setHandlePassword] = useState(true);
  const [handlePassword2, setHandlePassword2] = useState(true);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const { colors } = useTheme();

  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Added confirm password field
  const [username, setUsername] = useState("");
  const [ref_username, setRefUsername] = useState('');
  const [loading, setLoading] = useState(false);


  const handleRegister = async () => {
    // Trim + normalize input
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();
    const trimmedRefUsername = ref_username?.trim() || "twcjay";

    // ✅ Input Validation
    if (!trimmedUsername || !trimmedEmail || !trimmedPassword || !trimmedConfirmPassword) {
      Toast.show({
        type: "error",
        text1: "Missing Fields",
        text2: "Please fill in all fields.",
      });
      return;
    }

    // ✅ Password Match Check
    if (trimmedPassword !== trimmedConfirmPassword) {
      Toast.show({
        type: "error",
        text1: "Passwords Don't Match",
        text2: "Please make sure both passwords are the same.",
      });
      return;
    }

    try {
      setLoading(true);

      // 🛠️ Call API with optional ref_username
      const result = await registerUser(
        trimmedEmail,
        trimmedPassword,
        trimmedConfirmPassword,
        trimmedUsername,
        trimmedRefUsername // Optional param
      );

      setLoading(false);

      if (result.success) {

        Toast.show({
          type: "success",
          text1: "Registration Successful",
          text2: "Welcome to algora Network!",
        });

        navigation.navigate('SignIn');
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

        Toast.show({
          type: "error",
          text1: "Registration Failed",
          text2: result.message || "Invalid credentials",
        });
      }
    } catch (error) {
      setLoading(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

      Toast.show({
        type: "error",
        text1: "Unexpected Error",
        text2: "Something went wrong. Please try again.",
      });
      console.error("Register error:", error);
    }
  };



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* <Header leftIcon="back" title="Sign Up"/> */}
      <View style={{ flex: 1, paddingTop: 20, paddingLeft: 20 }}>
        <Image style={{ height: 18, width: 75, tintColor: colors.title }} source={IMAGES.logoImg} />
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsHorizontalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            paddingVertical: 25,
            paddingTop: 50
          }}
        >
          <View style={{ ...GlobalStyleSheet.container }}>
            <View style={{ alignItems: 'center', marginBottom: 30 }}>
              <Text style={{ ...FONTS.h3, color: colors.title }}>Join Algora</Text>
              <Text style={{ ...FONTS.fontLg, color: colors.text }}>Create a free  account!</Text>
            </View>


            <Text style={{ ...FONTS.font, color: colors.title, marginBottom: 5 }}>Username</Text>
            <View style={{ marginBottom: 10 }}>
              <TextInput
                style={[{
                  ...GlobalStyleSheet.formControl,
                  backgroundColor: colors.inputBg,
                  color: colors.title,
                  borderColor: colors.borderColor,
                }, isFocused2 && styles.inputActive]}
                onFocus={() => setisFocused2(true)}
                onBlur={() => setisFocused2(false)}
                placeholderTextColor={colors.text}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
              />
            </View>


            <Text style={{ ...FONTS.font, color: colors.title, marginBottom: 5 }}>Email address</Text>
            <View style={{ marginBottom: 20 }}>
              <TextInput
                style={[{
                  ...GlobalStyleSheet.formControl,
                  backgroundColor: colors.inputBg,
                  color: colors.title,
                  borderColor: colors.borderColor,
                }, isFocused && styles.inputActive]}
                onFocus={() => setisFocused(true)}
                onBlur={() => setisFocused(false)}
                placeholderTextColor={colors.text}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
              />
            </View>


            <Text style={{ ...FONTS.font, color: colors.title, marginBottom: 5 }}>Referral</Text>
            <View style={{ marginBottom: 10 }}>
              <TextInput
                style={[{
                  ...GlobalStyleSheet.formControl,
                  backgroundColor: colors.inputBg,
                  color: colors.title,
                  borderColor: colors.borderColor,
                }, isFocused2 && styles.inputActive]}
                onFocus={() => setisFocused2(true)}
                onBlur={() => setisFocused2(false)}
                placeholderTextColor={colors.text}
                placeholder="Optional"
                value={ref_username}
                onChangeText={setRefUsername}
              />
            </View>


            <Text style={{ ...FONTS.font, color: colors.title, marginBottom: 5 }}>Password</Text>
            <View style={{ marginBottom: 20 }}>
              <TextInput
                style={[{
                  ...GlobalStyleSheet.formControl,
                  backgroundColor: colors.inputBg,
                  color: colors.title,
                  borderColor: colors.borderColor,
                }, isFocused4 && styles.inputActive]}
                onFocus={() => setisFocused4(true)}
                onBlur={() => setisFocused4(false)}
                placeholderTextColor={colors.text}
                placeholder="Password"
                secureTextEntry={handlePassword}
                value={password}
                onChangeText={setPassword}
              />
              {(handlePassword) ?
                <TouchableOpacity style={styles.eyeIcon} onPress={() => setHandlePassword(false)}>
                  <SvgXml
                    height={24}
                    width={24}
                    fill={colors.text}
                    xml={ICONS.eyeOpen}
                  />
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.eyeIcon} onPress={() => setHandlePassword(true)}>
                  <SvgXml
                    height={24}
                    width={24}
                    fill={colors.text}
                    xml={ICONS.eyeClose}
                  />
                </TouchableOpacity>
              }
            </View>
            <Text style={{ ...FONTS.font, color: colors.title, marginBottom: 5 }}>Confirm password</Text>
            <View style={{ marginBottom: 20 }}>
              <TextInput
                style={[{
                  ...GlobalStyleSheet.formControl,
                  backgroundColor: colors.inputBg,
                  color: colors.title,
                  borderColor: colors.borderColor,
                }, isFocused5 && styles.inputActive]}
                onFocus={() => setisFocused5(true)}
                onBlur={() => setisFocused5(false)}
                placeholderTextColor={colors.text}
                placeholder="Confirm password"
                secureTextEntry={handlePassword2}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              {(handlePassword2) ?
                <TouchableOpacity style={styles.eyeIcon} onPress={() => setHandlePassword2(false)}>
                  <SvgXml
                    height={24}
                    width={24}
                    fill={colors.text}
                    xml={ICONS.eyeOpen}
                  />
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.eyeIcon} onPress={() => setHandlePassword2(true)}>
                  <SvgXml
                    height={24}
                    width={24}
                    fill={colors.text}
                    xml={ICONS.eyeClose}
                  />
                </TouchableOpacity>
              }
            </View>




            {/*  <View
              style={{
                flexDirection: 'row',
              }}
            >
              <View
                style={[Platform.OS === 'ios' && {
                  transform: [{
                    scale: .8
                  }],
                  marginRight: 5,
                }]}
              >

                <Checkbox
                  status={toggleCheckBox ? "checked" : "unchecked"}
                  onPress={() => setToggleCheckBox(!toggleCheckBox)}
                  color={COLORS.primary}
                />

              </View>
              <View style={{
                marginLeft: 4,
                marginTop: 7,
                flex: 1,
              }}>
                <Text style={{ ...FONTS.font, color: colors.title }}>I accept and agree to ther Terms and Conditions</Text>
              </View>
            </View> */}


          </View>
        </View>
        <View style={[GlobalStyleSheet.container, { padding: 30, width: '100%' }]}>

          {loading ? (
            <View style={styles.buttonContainer}>
              <ActivityIndicator size="small" color="#fff" />
              <Text style={styles.loadingButtonText}>Registering...</Text>
            </View>
          ) : (
            <CustomButton title="Register" onPress={handleRegister} disabled={loading} />
          )}


          <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 15 }}>
            <Text style={{ ...FONTS.font, color: colors.title, marginBottom: 2 }}>Already have an account?  </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('SignIn')}
            >
              <Text style={{ ...FONTS.font, color: COLORS.primary }}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
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

})


export default SignUp;
