import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";

const MeditationLayout = () => {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="nature-meditate" options={{ headerShown: false }} />
        <Stack.Screen name="affirmations" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
};

export default MeditationLayout;
