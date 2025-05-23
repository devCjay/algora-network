import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS, IMAGES, SIZES } from '../Utils/theme';
import { GlobalStyleSheet } from '../Utils/styleSheet';


const CustomTabBar = ({ state, navigation, descriptors }) => {
    const { colors } = useTheme();
    const tabWidth = (SIZES.width - 25);
  
    const circlePosition = useRef(new Animated.Value(tabWidth < SIZES.container ? tabWidth / 2.5 : SIZES.container / 2.5)).current;
    
    const tabW = tabWidth < SIZES.container ? tabWidth / 5 : (SIZES.container - 35) / 5;
  
    const onTabPress = (index) => {
      // Reset the navigation stack when switching tabs
      navigation.reset({
        index: 0, // Make sure to reset to the first tab (Home or whichever)
        routes: [{ name: state.routes[index].name }],
      });
  
      Animated.spring(circlePosition, {
        toValue: index * tabW,
        useNativeDriver: true, // Ensure using native driver for smoother animation
      }).start();
    };
  
    useEffect(() => {
      Animated.spring(circlePosition, {
        toValue: state.index * tabW,
        useNativeDriver: true,
      }).start();
    }, [state.index]);
  
    return (
      <View
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.2,
          shadowRadius: 5,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: colors.bgLight,
        }}
      >
        <View style={[GlobalStyleSheet.container, { padding: 0, backgroundColor: colors.background, flexDirection: 'row', zIndex: 3 }]}>
          <Animated.View style={{ transform: [{ translateX: circlePosition }] }}>
            <View style={{
              width: tabWidth < SIZES.container ? tabWidth / 5 : SIZES.container / 5,
              position: 'absolute',
              zIndex: 1,
              top: 0,
              left: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <View
                style={{
                  height: 45,
                  width: 45,
                  borderRadius: 45,
                  backgroundColor: COLORS.mycolor,
                }}
              />
            </View>
          </Animated.View>
  
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label = options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;
  
            const isFocused = state.index === index;
            const iconTranslateY = useRef(new Animated.Value(0)).current;
  
            Animated.timing(iconTranslateY, {
              toValue: isFocused ? 10 : 0,
              duration: 200,
              useNativeDriver: true,
            }).start();
  
            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
  
              if (!isFocused && !event.defaultPrevented) {
                // Reset the navigation state to the correct tab
                navigation.reset({
                  index: 0, // Reset to the first tab
                  routes: [{ name: route.name }],
                });
                onTabPress(index); // Update the circle position
              }
            };
  
            return (
              <View style={styles.tabItem} key={index}>
                <TouchableOpacity style={styles.tabLink} onPress={onPress}>
                  <Animated.View style={{ transform: [{ translateY: iconTranslateY }] }}>
                    <Image
                      style={{
                        height: 18,
                        width: 18,
                        resizeMode: 'contain',
                        marginBottom: 4,
                        tintColor: isFocused ? COLORS.white : colors.text,
                      }}
                      source={
                        label === "Home" ? IMAGES.home3 :
                        label === "Referral" ? IMAGES.referral2 :
                        label === "Logout" ? IMAGES.logout :
                        label === "Miner" ? IMAGES.trade3 :
                        label === "Orders" ? IMAGES.wallet3 :
                        null
                      }
                    />
                  </Animated.View>
                  <Text style={{ ...FONTS.fontSm, color: colors.text, opacity: isFocused ? 0 : 1 }}>
                    {label}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    tabLink: {
      alignItems: 'center',
    },
    tabItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    navText: {
      ...FONTS.fontSm,
    },
  });
  
  export default CustomTabBar;
  