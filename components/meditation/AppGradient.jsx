import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import Content from "./Content";

const AppGradient = ({ children, colors }) => {
  return (
    <LinearGradient colors={colors} style={styles.container}>
      <Content>{children}</Content>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppGradient;
