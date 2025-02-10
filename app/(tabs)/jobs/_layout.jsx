import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

const jobsLayout = () => {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="jobs-home" options={{ headerShown: false }} />
        <Stack.Screen name="search/[id]" options={{ headerShown: false }} />
        <Stack.Screen
          name="job-details/[id]"
          options={{ headerShown: false }}
        />
      </Stack>
    </SafeAreaProvider>
  );
};

export default jobsLayout;
