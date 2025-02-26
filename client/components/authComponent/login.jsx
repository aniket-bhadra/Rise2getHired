import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Animated,
  Easing,
} from "react-native";
import styles from "./styles";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { apiBaseUrl } from "../../config/config";
import { TimerContext } from "../../context/TimerContext";

import axios from "axios";
import { Alert } from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${apiBaseUrl}/api/user/login`, {
        email,
        password,
      });
      setUser(response.data);
      router.push("/jobs/jobs-home");
    } catch (error) {
      Alert.alert(
        "Login Failed",
        error.response?.data?.message || error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.formContainer}>
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
        style={styles.button}
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>LogIn</Text>
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
            <Text style={styles.spinnerText}>Logging in...</Text>
          </View>
        </View>
      )}
    </View>
  );
}
