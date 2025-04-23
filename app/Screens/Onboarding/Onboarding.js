import React, {useRef, useState, useEffect} from "react";
import { 
  Animated,
  Image,
  SafeAreaView, 
  ScrollView, 
  StyleSheet, 
  Text,
  View,
  ActivityIndicator
} from "react-native";
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS, IMAGES, SIZES } from "../../Utils/theme";
import CustomButton from "../../components/CustomButton";
import { LinearGradient } from 'expo-linear-gradient';
import { GlobalStyleSheet } from "../../Utils/styleSheet";
import Header from "../../layout/header";

const Onboarding = (props) => {

  const { colors } = useTheme();


  const DATA = [
    {
      image :  IMAGES.welcomeImg,
      title : 'Algora Cloud Mining',
      desc  : 'Earn Algora while you sleep without \n thinking about infrastructure!', 
    }
  
  ]

  const scrollValue = useRef(new Animated.Value(0)).current;

  return (
    <>
      <SafeAreaView style={{flex:1,backgroundColor:colors.background}}> 
          <View style={styles.container}>
            

          <View style={{ flex:1, paddingTop:20, paddingLeft:20  }}>
              <Image style={{ height:18, width:75, tintColor:colors.title}} source={IMAGES.logoImg} />
          </View>


            <ScrollView
                horizontal
                pagingEnabled
                scrollEventThrottle={16}
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollValue } } }],
                    { useNativeDriver: false },
                )}>
                {DATA.map((data,index) => (
                    
                    <View style={styles.slideItem} key={index}>
                        <View
                          style={{
                            flex:1,
                            alignItems:'center',
                            justifyContent:'center',
                            paddingTop:20,
                          }}
                        >
                          <LinearGradient
                            colors={[colors.bgLight,colors.background]}
                            style={{
                              position:'absolute',
                              height:320,
                              width:320,
                              borderRadius:300,
                            }}
                          >

                          </LinearGradient>
                        <Image style={{height:250,width:250,resizeMode:'contain',marginBottom:25}} source={data.image}/>
                        </View>
                        <Text style={{...FONTS.h3,color:colors.title,marginBottom:8}}>{data.title}</Text>
                        <Text style={{...FONTS.fontLg,color:colors.text,textAlign:'center'}}>{data.desc}</Text>
                    </View>
                
                ))}
            </ScrollView>
           {/*  <View style={styles.indicatorConatiner} pointerEvents="none">
                {DATA.map((x, i) => (
                    <Indicator i={i} key={i} scrollValue={scrollValue} />
                ))}
            </View> */}
          </View>
          <View
            style={[GlobalStyleSheet.container,{
              padding:30,
              width:'100%',
            }]}
          >
            <CustomButton 
              onPress={()=> props.navigation.navigate('SignIn')}
              title="Get started"
            />
          </View>
        </SafeAreaView>
    </>
  );
};

function Indicator({ i, scrollValue }) {

  const {colors} = useTheme();

  const translateX = scrollValue.interpolate({
      inputRange: [-SIZES.width + i  * SIZES.width, i * SIZES.width, SIZES.width + i * SIZES.width],
      outputRange: [-20, 0, 20],
  });
  return (
      <View style={[styles.indicator,{backgroundColor:colors.borderColor}]}>
          <Animated.View
              style={[styles.activeIndicator, { transform: [{ translateX }] }]}
          />
      </View>
  );
}


const styles = StyleSheet.create({

  container: {
      flex: 1,
  },
  slideItem: {
      width: SIZES.width,
      height: '100%',
      alignItems:'center',
      justifyContent:'center',
      padding:20,
      paddingBottom:60,
  },
  indicatorConatiner: {
      alignSelf: 'center',
      position: 'absolute',
      bottom: 10,
      flexDirection: 'row',
  },
  indicator: {
      height: 10,
      width: 10,
      borderRadius: 5,
      marginHorizontal: 5,
      overflow: 'hidden',
  },
  activeIndicator: {
      height: '100%',
      width: '100%',
      backgroundColor: COLORS.primary,
      borderRadius: 10,
  },

})


export default Onboarding;

