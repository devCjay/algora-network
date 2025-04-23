import React, { useState } from "react";
import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import StackNavigator from "./StackNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import themeContext from "../Utils/themeContext";
import { COLORS } from "../Utils/theme";

const Routes = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const authContext = React.useMemo(() => ({
    setDarkTheme: () => {
      setIsDarkTheme(true);
    },
    setLightTheme: () => {
      setIsDarkTheme(false);
    }
  }), []);

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      background: '#ffffff',
      bgColor : "#f5f5f5",
      title : COLORS.title,
      cardbackground : '#fff',
      text : COLORS.text,
      inputBg : '#FBFBFB',
      shadow : '#E3E3E3',
      borderColor : "#E4E4E4",
      bgLight: "#fff",
    }
  }
  
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      background: "#020e52",
      bgColor : "#020e52",
      title : '#fff',
      cardbackground : '#15335E',
      text : '#8EA5C8',
      inputBg : '#0c266c',
      shadow : '#193050', 
      borderColor : "#0c266c",
      bgLight: "#11369a",
    }
  }
  
  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  return (
    <SafeAreaProvider>
      <themeContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          <StackNavigator />
        </NavigationContainer>
      </themeContext.Provider>
    </SafeAreaProvider>
  );
};
export default Routes;
