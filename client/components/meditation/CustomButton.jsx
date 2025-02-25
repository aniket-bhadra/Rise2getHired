import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const CustomButton = ({
  onPress,
  title,
  textStyles = {},
  containerStyles = {},
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.button, containerStyles]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, textStyles]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#e58e40",
    padding: 12,
    borderRadius: 15,
    alignItems: "center",
    minHeight: 52,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CustomButton;
