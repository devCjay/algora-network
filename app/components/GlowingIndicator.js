import React, { useEffect, useRef } from "react";
import { View, Animated, Easing } from "react-native";

const GlowingIndicator = ({ isOnline }) => {
  const glowAnim = useRef(new Animated.Value(6)).current; // Initial shadow radius

  useEffect(() => {
    if (isOnline) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 15, // Expand glow
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false, // Required for shadow properties
          }),
          Animated.timing(glowAnim, {
            toValue: 6, // Retract glow
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false, // Required for shadow properties
          }),
        ])
      ).start();
    } else {
      glowAnim.setValue(6); // Reset if offline
    }
  }, [isOnline]);

  return (
    <Animated.View
      style={{
        height: 35,
        width: 35,
        borderRadius: 17,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: isOnline ? "rgba(0,255,0,0.3)" : "gray",

        // Animated Glow Effect
        shadowColor: isOnline ? "rgba(0, 255, 0, 1)" : "transparent",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: glowAnim, // Animated shadow radius
        elevation: glowAnim, // Works for Android shadow effect
        borderWidth: 1,
        borderColor: isOnline ? "rgba(0, 255, 0, 0.6)" : "gray",
      }}
    />
  );
};

export default GlowingIndicator;
