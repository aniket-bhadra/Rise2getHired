import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";

const MeditationLayout = () => {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="nature-meditate" options={{ headerShown: false }} />
        {/* affirmation conditionally rendered as component inside nature-meditate that is why not included here */}
        <Stack.Screen
          name="DynamicAffirmationScreens/[itemId]"
          options={{ headerShown: false }}
        />
      </Stack>
    </SafeAreaProvider>
  );
};

export default MeditationLayout;
