import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const RootTabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#116461",
      }}
    >
      <Tabs.Screen
        name="jobs"
        options={{
          tabBarLabel: "Jobs",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="briefcase" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="meditation"
        options={{
          tabBarLabel: "Meditation",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="meditation" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default RootTabsLayout;
