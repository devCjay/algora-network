import React from "react";
import { 
  Image,
  ImageBackground,
  ActivityIndicator,
  View
} from "react-native";
import { useTheme } from '@react-navigation/native';

const Splash = () => {
  const { colors } = useTheme();

  return (
    <ImageBackground
      source={colors.backgroundImage}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View style={{ alignItems: 'center' }}>
        <Image
          style={{
            width: 170,
            resizeMode: 'contain',
            marginBottom: 20,
          }}
          source={colors.logoImg}
        />
        <ActivityIndicator size="large" color="rgb(15, 87, 255)" />
      </View>
    </ImageBackground>
  );
};

export default Splash;
