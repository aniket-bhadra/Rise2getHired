import {
  View,
  Text,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import AFFIRMATION_GALLERY from "../../../../constants/meditationData/affirmation-gallery";
import AppGradient from "../../../../components/meditation/AppGradient";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";

const AffirmationPractice = () => {
  const { itemId } = useLocalSearchParams();
  const [affirmation, setAffirmation] = useState();
  const [sentences, setSentences] = useState([]);

  useEffect(() => {
    for (let idx = 0; idx < AFFIRMATION_GALLERY.length; idx++) {
      const affirmationsData = AFFIRMATION_GALLERY[idx].data;

      const affirmationToStart = affirmationsData.find(
        (affirmation) => affirmation.id === Number(itemId)
      );
      if (affirmationToStart) {
        setAffirmation(affirmationToStart);
        return;
      }
    }
  }, []);

  useEffect(() => {
    if (affirmation) {
      const affirmationArray = affirmation.text.split(".");
      if (affirmationArray[affirmationArray.length - 1] === "") {
        affirmationArray.pop();
      }
      setSentences(affirmationArray);
    }
  }, [affirmation]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={affirmation?.image}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <AppGradient colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0.9)"]}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <AntDesign name="leftcircleo" size={35} color="#d18b52" />
          </Pressable>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.centerView}>
              <View style={styles.textContainer}>
                {sentences?.map((sentence, index) => (
                  <Text key={index} style={styles.sentenceText}>
                    {sentence}.
                  </Text>
                ))}
              </View>
            </View>
          </ScrollView>
        </AppGradient>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    opacity: 0.8
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 6,
    zIndex: 10,
  },
  scrollView: {
    marginTop: 140,
  },
  centerView: {
    height: "100%",
    justifyContent: "center",
  },
  textContainer: {
    height: "80%",
    justifyContent: "center",
  },
  sentenceText: {
    color: "white",
    fontSize: 26,
    marginBottom: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AffirmationPractice;
