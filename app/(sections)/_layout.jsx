import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesomeCode from "@expo/vector-icons/FontAwesome";
import { Image, View } from "react-native";

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
                width: size + 6, // Slightly larger container for border effect
                height: size + 6,
                borderRadius: (size + 6) / 2,
                borderWidth: focused ? 2 : 0, // Show border when active
                borderColor: focused ? "#116461" : "transparent", // Active border color:color,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={{
                  uri: "https://github.com/aniket-bhadra/E-Commerce-Project-Data/blob/main/AI-generated%20Product%20images/male/male%20kurtas/red1.jpg?raw=true",
                }}
                style={{
                  width: size,
                  height: size,
                  borderRadius: size / 2, // Makes it round
                }}
              />
            </View>
          ),
        }}
      />
      ;
    </Tabs>
  );
};

export default RootTabsLayout;
