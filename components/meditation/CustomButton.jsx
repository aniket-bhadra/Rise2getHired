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
      style={[styles.container, containerStyles]}
      onPress={onPress}
    >
      <Text style={[styles.text, textStyles]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    minHeight: 62,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "600",
    fontSize: 18,
  },
});

export default CustomButton;
