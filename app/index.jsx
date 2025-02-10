import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import Signup from "../components/authComponent/signup";
import Login from "../components/authComponent/login";
import styles from "../components/authComponent/styles";
import { useRouter } from "expo-router";

export default function loginOrSignup() {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.logoText}>Rise2GetHired</Text>

      {isLogin ? <Login /> : <Signup />}

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.switchText}>
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Log In"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
