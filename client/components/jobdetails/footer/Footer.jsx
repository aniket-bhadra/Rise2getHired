import React, { useEffect, useState, useContext } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Linking,
  Alert,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import styles from "./footer.style";
import axios from "axios";
import { apiBaseUrl } from "../../../config/config";
import { TimerContext } from "../../../context/TimerContext";

const Footer = ({ url, job }) => {
  const { user, setUser } = useContext(TimerContext);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if the job is already saved
  useEffect(() => {
    const checkIfJobSaved = async () => {
      try {
        const response = await axios.post(
          `${apiBaseUrl}/api/user/is-job-saved`,
          {
            userId: user._id,
            jobId: job.job_id,
          }
        );
        setIsSaved(response.data.isSaved);
      } catch (error) {
        console.log("Error checking job status:", error);
      } finally {
        setLoading(false);
      }
    };

    checkIfJobSaved();
  }, [job.job_id]);

  // Save the job function
  const saveJob = async () => {
    try {
      const response = await axios.post(`${apiBaseUrl}/api/user/save-job`, {
        userId: user._id,
        job,
      });
      setIsSaved(true);
      setUser(response.data.user);
      Alert.alert("Success", "Job saved successfully!");
    } catch (error) {
      Alert.alert("Error", error.response?.data?.error || "Failed to save job");
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="small" color="#e58e40" />
      ) : (
        <TouchableOpacity
          style={[
            styles.likeBtn,
            isSaved && { backgroundColor: "#e58e40" }, // Change color if saved
          ]}
          onPress={saveJob}
          disabled={isSaved} // Disable button if job is already saved
        >
          <Ionicons
            name="bookmark-outline"
            size={24}
            color={isSaved ? "#fff" : "#e58e40"}
          />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.applyBtn}
        onPress={() => Linking.openURL(url)}
      >
        <Text style={styles.applyBtnText}>Apply for Job</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
