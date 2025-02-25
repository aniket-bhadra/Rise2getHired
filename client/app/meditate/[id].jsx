import {
  View,
  Text,
  ImageBackground,
  Pressable,
  StyleSheet,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MEDITATION_IMAGES from "../../constants/meditationData/meditation-images";
import AppGradient from "../../components/meditation/AppGradient";
import { router, useLocalSearchParams } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomButton from "../../components/meditation/CustomButton";
import { Audio } from "expo-av";
import {
  MEDITATION_DATA,
  AUDIO_FILES,
} from "../../constants/meditationData/meditationData";
import AdjustMeditationDuration from "../meditateModal/adjust-meditation-duration";
import { TimerContext } from "../../context/TimerContext";
import LottieView from "lottie-react-native";

let DOM_UNMOUNT = 0;

const Meditate = () => {
  const { id } = useLocalSearchParams();
  const { duration: secondsRemaining, setDuration } = useContext(TimerContext);
  const [isMeditating, setIsMeditating] = useState(false);
  const [audioSound, setAudioSound] = useState();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    let timerId;

    if (!isMeditating) return;
    if (!audioSound) return;
    if (secondsRemaining === 0) {
      audioSound?.pauseAsync();
      setIsPlayingAudio(false);
      setIsMeditating(false);
      return;
    }

    timerId = setTimeout(() => {
      setDuration((prevState) => prevState - 1);
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [secondsRemaining, isMeditating, audioSound]);

  useEffect(() => {
    if (!audioSound || !isMeditating) return;

    const onPlaybackStatusUpdate = async (status) => {
      if (status.didJustFinish && secondsRemaining > 0) {
        await audioSound.replayAsync();
      }
    };

    audioSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

    //Even though we're manually checking the playback status, this cleanup step makes sure no extra listeners stay behind.
    // Without it, the code might still work most of the time.
    // But there's a small chance of issues like:
    // Multiple event listeners stacking up.
    // Unexpected behavior (e.g., audio restarting multiple times).
    // Potential memory leaks when the component unmounts.
    // So, while removing it won’t always break the code immediately, it's best practice to include it to eliminate any small chances of bugs.
    return () => {
      audioSound.setOnPlaybackStatusUpdate(null);
    };
  }, [audioSound, isMeditating, secondsRemaining]);

  useEffect(() => {
    DOM_UNMOUNT = 0;
    return () => {
      DOM_UNMOUNT++;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (DOM_UNMOUNT === 0) return;
      setDuration(10);
      audioSound?.unloadAsync();
    };
  }, [audioSound]);

  const toggleMeditationSessionStatus = async () => {
    if (secondsRemaining === 0) setDuration(10);
    setIsMeditating((prevState) => !prevState);

    await toggleSound();
  };

  const toggleSound = async () => {
    const sound = audioSound ? audioSound : await initializeSound();

    const status = await sound?.getStatusAsync();

    if (status?.isLoaded && !isPlayingAudio) {
      await sound.playAsync();
      setIsPlayingAudio(true);
    } else {
      await sound.pauseAsync();
      setIsPlayingAudio(false);
    }
  };

  const handleAdjustDuration = () => {
    //  console.log(secondsRemaining);
    if (isMeditating) toggleMeditationSessionStatus();

    setIsModalVisible(true);
  };

  const initializeSound = async () => {
    const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;

    const { sound } = await Audio.Sound.createAsync(AUDIO_FILES[audioFileName]);

    setAudioSound(sound);
    return sound;
  };

  const formattedTimeMinutes = String(
    Math.floor(secondsRemaining / 60)
  ).padStart(2, "0");
  const formattedTimeSeconds = String(
    Math.floor(secondsRemaining % 60)
  ).padStart(2, "0");

  return (
    <View style={styles.container}>
      <ImageBackground
        source={MEDITATION_IMAGES[Number(id) - 1]}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <AppGradient colors={["transparent", "rgba(0,0,0,0.9)"]}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <AntDesign name="leftcircleo" size={36} color="#e58e40" />
          </Pressable>

          <View style={styles.mainContent}>
            {isMeditating && !audioSound ? (
              <View style={styles.animationContainer}>
                <LottieView
                  source={require("../../assets/Animation - 1728074421194 (1).json")}
                  autoPlay
                  loop
                  style={styles.animation}
                />
              </View>
            ) : (
              <View style={styles.timeContainer}>
                <Text style={styles.timeText}>
                  {formattedTimeMinutes}:{formattedTimeSeconds}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton
              title="Adjust duration"
              onPress={handleAdjustDuration}
            />
            <CustomButton
              title={isMeditating ? "Stop" : "Start Meditation"}
              onPress={toggleMeditationSessionStatus}
              containerStyles={styles.buttonSpacing}
            />
          </View>
        </AppGradient>
        <AdjustMeditationDuration
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    top: 42,
    left: 7,
    zIndex: 10,
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
  },
  animationContainer: {
    height: 280,
    aspectRatio: 1,
    marginHorizontal: "auto",
  },
  animation: {
    flex: 1,
  },
  timeContainer: {
    marginHorizontal: "auto",
    backgroundColor: "rgba(229, 229, 229, 0.8)",
    borderRadius: 9999,
    width: 176,
    height: 176,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: "#a2b8a0",
  },
  timeText: {
    fontSize: 32,
    color: "#312651",
    fontFamily: "monospace",
  },
  buttonContainer: {
    marginBottom: 20,
  },
  buttonSpacing: {
    marginTop: 16,
  },
});

export default Meditate;
