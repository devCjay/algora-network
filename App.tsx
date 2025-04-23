import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform, SafeAreaView, View } from 'react-native';
import { useFonts } from 'expo-font';
import Routes from './app/Navigations/Route';
import Toast, { BaseToast } from 'react-native-toast-message';





const App = () => {

  const [loaded] = useFonts({
    PoppinsRegular: require('./app/assets/fonts/Poppins-Regular.ttf'),
    CabinSemiBold: require('./app/assets/fonts/Cabin-SemiBold.ttf'),
    CabinMedium: require('./app/assets/fonts/Cabin-Medium.ttf'),
    CabinBold: require('./app/assets/fonts/Cabin-Bold.ttf'),
  });


  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{ backgroundColor: 'green' }} // ✅ Change background color
        text1Style={{ color: 'white', fontWeight: 'bold' }} // ✅ Text color
        text2Style={{ color: 'white' }}
      />
    ),
    error: (props: any) => (
      <BaseToast
        {...props}
        style={{ backgroundColor: 'red' }} // ✅ Red background for errors
        text1Style={{ color: 'white' }}
        text2Style={{ color: 'white' }}
      />
    ),
    info: (props: any) => (
      <BaseToast
        {...props}
        style={{ backgroundColor: 'blue' }} // ✅ Blue background for info
        text1Style={{ color: 'white' }}
        text2Style={{ color: 'white' }}
      />
    ),
  };


  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#020e52' }}>
        <View style={{ flex: 1, backgroundColor: '#020e52' }}>
          <Routes />
        </View>
      </SafeAreaView>

      <Toast config={toastConfig} />
    </SafeAreaProvider>
  );
};

export default App;
