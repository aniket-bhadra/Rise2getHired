import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  Image,
  FlatList,
  ActivityIndicator,
  Animated,
  Easing,
} from "react-native";
import styles from "./styles";
import { useRouter } from "expo-router";
import avatarStyles from "./avatarStyles";
import avatars from "../../constants/avatars";
import { apiBaseUrl } from "../../config/config";

import axios from "axios";
import { Alert } from "react-native";
import { useContext } from "react";
import { TimerContext } from "../../context/TimerContext";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useContext(TimerContext);

  // Animation values for loading dots
  const dot1Opacity = useState(new Animated.Value(0.3))[0];
  const dot2Opacity = useState(new Animated.Value(0.3))[0];
  const dot3Opacity = useState(new Animated.Value(0.3))[0];

  // Animation sequence for dots
  useEffect(() => {
    if (isLoading) {
      Animated.loop(
        Animated.sequence([
          // Dot 1 animation
          Animated.timing(dot1Opacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
            easing: Easing.ease,
          }),
          // Dot 2 animation
          Animated.timing(dot2Opacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
            easing: Easing.ease,
          }),
          // Dot 3 animation
          Animated.timing(dot3Opacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
            easing: Easing.ease,
          }),
          // Reset
          Animated.timing(dot1Opacity, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: true,
            easing: Easing.ease,
          }),
          Animated.timing(dot2Opacity, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: true,
            easing: Easing.ease,
          }),
          Animated.timing(dot3Opacity, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: true,
            easing: Easing.ease,
          }),
        ])
      ).start();
    } else {
      // Reset animations when not loading
      dot1Opacity.setValue(0.3);
      dot2Opacity.setValue(0.3);
      dot3Opacity.setValue(0.3);
    }
  }, [isLoading]);

  const handleSignup = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${apiBaseUrl}/api/user/`, {
        name,
        email,
        password,
        pic: selectedAvatar.url,
      });
      setUser(response.data);
      router.push("/jobs/jobs-home");
    } catch (error) {
      Alert.alert(
        "Signup Failed",
        error.response?.data?.message || error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectAvatar = (avatar) => {
    setSelectedAvatar(avatar);
    setModalVisible(false);
  };

  const renderAvatarItem = ({ item }) => (
    <TouchableOpacity
      style={[
        avatarStyles.avatarOption,
        selectedAvatar?.id === item.id && avatarStyles.selectedAvatarOption,
      ]}
      onPress={() => handleSelectAvatar(item)}
    >
      <Image source={{ uri: item.url }} style={avatarStyles.avatarImage} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        editable={!isLoading}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        editable={!isLoading}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!isLoading}
      />

      <TouchableOpacity
        style={avatarStyles.avatarSelector}
        onPress={() => setModalVisible(true)}
        disabled={isLoading}
      >
        {selectedAvatar ? (
          <View style={avatarStyles.selectedAvatarContainer}>
            <Image
              source={{ uri: selectedAvatar.url }}
              style={avatarStyles.selectedAvatar}
            />
            <Text style={avatarStyles.changeText}>Change Avatar</Text>
          </View>
        ) : (
          <Text style={avatarStyles.avatarSelectorText}>
            Choose Profile Avatar
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          (!name || !email || !password || !selectedAvatar || isLoading) &&
            avatarStyles.disabledButton,
        ]}
        onPress={handleSignup}
        disabled={!name || !email || !password || !selectedAvatar || isLoading}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <View style={styles.spinnerContainer}>
            <View style={styles.spinnerInner}>
              <ActivityIndicator size="large" color="#e58e40" />
            </View>
            <View style={styles.spinnerDotsContainer}>
              <Animated.View
                style={[styles.spinnerDot, { opacity: dot1Opacity }]}
              />
              <Animated.View
                style={[styles.spinnerDot, { opacity: dot2Opacity }]}
              />
              <Animated.View
                style={[styles.spinnerDot, { opacity: dot3Opacity }]}
              />
            </View>
            <Text style={styles.spinnerText}>Creating your account...</Text>
          </View>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={avatarStyles.modalContainer}>
          <View style={avatarStyles.modalContent}>
            <Text style={avatarStyles.modalTitle}>Select Your Avatar</Text>

            <FlatList
              data={avatars}
              renderItem={renderAvatarItem}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              contentContainerStyle={avatarStyles.avatarGrid}
            />

            <TouchableOpacity
              style={avatarStyles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={avatarStyles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
