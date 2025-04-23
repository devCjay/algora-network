import React, { useEffect, useState, useRef } from "react";
import { View, Text, Animated, Easing, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const CountdownTimer = ({ initialTime = 2 * 60 * 60, onExpire }) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const rotation = useRef(new Animated.Value(0)).current;
    const intervalRef = useRef(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(intervalRef.current); // Cleanup interval on unmount
    }, []);

    useEffect(() => {
        if (timeLeft === 0 && onExpire) {
            onExpire(); // Trigger callback when timer expires
        }
    }, [timeLeft, onExpire]);



    useEffect(() => {
    const startAnimation = () => {
        rotation.setValue(0); // Reset the animation value
        Animated.loop(
            Animated.timing(rotation, {
                toValue: 1,
                duration: 2000, // 2 seconds for full rotation
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    };

    startAnimation(); // Start the animation when the component mounts

    return () => {
        rotation.stopAnimation(); // Stop the animation on unmount
    };
}, [rotation, timeLeft]); // Restart animation when `timeLeft` changes


    const rotateInterpolate = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    const formatTime = (seconds) => {
        const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
        const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
        const secs = String(seconds % 60).padStart(2, "0");
        return `${hrs}:${mins}:${secs}`;
    };

    return (
        <View style={styles.container}>
            <View style={styles.circle}>
                <Animated.View
                    style={[
                        styles.spinner,
                        { transform: [{ rotate: rotateInterpolate }] },
                    ]}
                />
                <Text style={styles.timerText}>
                    {timeLeft > 0 ? formatTime(timeLeft) : "EXPIRED"}
                </Text>
            </View>
        </View>
    );
};

CountdownTimer.propTypes = {
    initialTime: PropTypes.number.isRequired,
    onExpire: PropTypes.func, // Optional callback for timer expiration
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    circle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "rgb(12, 38, 108)",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
    },
    spinner: {
        position: "absolute",
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 4,
        borderTopColor: "green",
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "transparent",
    },
    timerText: {
        fontSize: 12,
        fontWeight: "bold",
        color: "rgb(219, 225, 240)",
    },
});

export default CountdownTimer;