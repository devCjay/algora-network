import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";

const NumberInput = () => {
  const [value, setValue] = useState(1);

  const increaseValue = () => setValue(prev => prev + 1);
  const decreaseValue = () => setValue(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Number of months</Text>
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.button} onPress={decreaseValue}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>

        <TextInput 
          style={styles.input} 
          value={String(value)} 
          keyboardType="numeric" 
          editable={false} 
        />

        <TouchableOpacity style={styles.button} onPress={increaseValue}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",  // Align label & input in one row
    alignItems: "center",   // Vertically align them
    justifyContent: "space-between",
    padding: 10,
  },
  label: {
    color: "#A0A0A0", 
    fontSize: 16,
    marginBottom: 8,
   
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    overflow: "hidden",
  
    
  },
  button: {
    backgroundColor: "#222",
    padding: 10,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
  input: {
    flex: 1,
    textAlign: "center",
    color: "#FFF",
    fontSize: 18,
    paddingVertical: 10,
    backgroundColor: "#121212",
  },
});

export default NumberInput;
