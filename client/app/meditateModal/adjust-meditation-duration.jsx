import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import AppGradient from "../../components/meditation/AppGradient";
import Modal from "react-native-modal";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomButton from "../../components/meditation/CustomButton";
import { TimerContext } from "../../context/TimerContext";

const AdjustMeditationDuration = ({ isVisible, onClose }) => {
  const { setDuration } = useContext(TimerContext);

  const handlePress = (duration) => {
    setDuration(duration);
    onClose();
  };

  return (
    <Modal
      isVisible={isVisible}
      style={styles.modal}
      backdropOpacity={0}
    >
      <View style={styles.container}>
        <AppGradient colors={["transparent", "#a2b8a0", "#116461"]}>
          <View style={styles.closeButton}>
            <AntDesign
              name="closecircleo"
              size={28}
              color="#e58e40"
              onPress={onClose}
            />
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>Set Duration</Text>

            {[10, 5 * 60, 10 * 60, 15 * 60].map((duration, index) => (
              <CustomButton
                key={index}
                title={`${duration === 10 ? "10 seconds" : duration / 60 + " minutes"}`}
                onPress={() => handlePress(duration)}
                containerStyles={styles.buttonContainer}
              />
            ))}
          </View>
        </AppGradient>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  container: {
    height: "70%",
    width: "90%",
    alignSelf: "center",
    borderRadius: 20,
    overflow: "hidden",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: "#116461",
    marginBottom: 24,
  },
  buttonContainer: {
    marginBottom: 20,
  },
});

export default AdjustMeditationDuration;
