import React, { useEffect, useRef } from "react";
import { View, Animated, Easing, Text, StyleSheet } from "react-native";
import { COLORS } from "../Utils/theme";

const PulsatingIndicator = ({ isOnline = true }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isOnline) {
      Animated.loop(
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 3, // Expanding effect
            duration: 2000,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0, // Fading effect
            duration: 2000,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [isOnline]);

  return (
    <View style={styles.container}>
      {/* Pulsating Glow Effect */}
      {isOnline && (
        <Animated.View
          style={[
            styles.pulsatingCircle,
            { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
          ]}
        />
      )}

      {/* Main Status Indicator */}
      <View style={[styles.indicator, { backgroundColor: isOnline ? "rgb(106, 224, 106)" : "gray" }]} />

      {/* Online Text */}
      <Text style={styles.statusText}>{isOnline ? "Miner active" : "No Miner"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  pulsatingCircle: {
    position: "absolute",
    width: 15,
    height: 15,
    borderRadius: 15,
    backgroundColor: "rgb(187, 238, 187)", // Light green glow
  },
  indicator: {
    width: 15,
    height: 15,
    borderRadius: 10,
    marginRight: 10, // Space between text and indicator
  },
  statusText: {
    fontSize: 12,
    fontWeight: "",
    color:"rgb(208, 238, 208)",
  },
});

export default PulsatingIndicator;
