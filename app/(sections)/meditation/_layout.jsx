import { View, Text } from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";

const meditationLayout = () => {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="meditation-home" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
};

export default meditationLayout;
