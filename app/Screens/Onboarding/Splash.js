import React from "react";
import { 
  Image,
  ImageBackground 
} from "react-native";
import { useTheme } from '@react-navigation/native';
//import themeContext from "../../Utils/themeContext";

const Splash = (props) => {
  
  const { colors } = useTheme();
  //const { toggleTheme } = React.useContext(themeContext);

  return (
    <>
      <ImageBackground
        source={colors.backgroundImage}
        style={{
          flex:1,
          alignItems:'center',
          justifyContent:'center',
        }}
      >
        <Image
          style={{
            width:170,
            resizeMode:'contain',
          }}
          source={colors.logoImg}
        />
      </ImageBackground>
    </>
  );
};

export default Splash;
