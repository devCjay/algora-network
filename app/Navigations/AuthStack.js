// navigation/AuthStack.tsx

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "../Screens/Onboarding/Onboarding";
import SignIn from "../Screens/Auth/SignIn";
import SignUp from "../Screens/Auth/SignUp";
import ForgotPassword from "../Screens/Auth/ForgotPassword";
import Otpauthention from "../Screens/Auth/Otpauthention";
import ResetPasssword from "../Screens/Auth/ResetPasssword";

const Stack = createNativeStackNavigator();



export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
       {/* Auth Screens */}
       <Stack.Screen name={"Onboarding"} component={Onboarding} />
        <Stack.Screen name={"SignIn"} component={SignIn} />
        <Stack.Screen name={"SignUp"} component={SignUp} />
        <Stack.Screen name={"ForgotPassword"} component={ForgotPassword} />
        <Stack.Screen name={"Otpauthention"} component={Otpauthention} />
        <Stack.Screen name={"ResetPasssword"} component={ResetPasssword} />
    </Stack.Navigator>
  );
}
