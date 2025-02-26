import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
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
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>LogIn</Text>
      </TouchableOpacity>
    </View>
  );
}
