import { Tabs } from "expo-router";
import { useColorScheme, View, Image } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesomeCode from "@expo/vector-icons/FontAwesome";
import { TimerContext } from "../../context/TimerContext";
import { useContext } from "react";

const RootTabsLayout = () => {
  const theme = useColorScheme(); // Get current theme ('light' or 'dark')
  const { user } = useContext(TimerContext);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#116461",
        tabBarStyle: {
          backgroundColor: theme === "dark" ? "#000" : "#FFF", // Dynamic background
        },
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
      <Tabs.Screen
        name="codeEditor"
        options={{
          tabBarLabel: "Code",
          tabBarIcon: ({ color }) => (
            <FontAwesomeCode name="code" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <View
              style={{
                width: size + 6,
                height: size + 6,
                borderRadius: (size + 6) / 2,
                borderWidth: focused ? 2 : 0,
                borderColor: focused ? "#116461" : "transparent",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={{
                  uri: user?.pic,
                }}
                style={{
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                }}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

export default RootTabsLayout;
