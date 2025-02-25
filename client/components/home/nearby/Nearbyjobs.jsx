import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { COLORS } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import styles from "./nearbyjobs.style";

//! remove this
import data from "../../../mockSearchData.json";

// !  import it, uncomment the option object inside useFetch
// import { useFetch } from "../../../hook/useFetch";

const Nearbyjobs = () => {
  const router = useRouter();
  // !  uncomment
  // const { isLoading, error, data } = useFetch("search", {
  //   query: "Remote jobs",
  //   num_pages: 1,
  // });
  const isLoading = false;
  const error = null;

  const showAllHandler = () => {
    router.push("/jobs/search/Remote Jobs");
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Remote Jobs</Text>
        <TouchableOpacity onPress={showAllHandler}>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something Went Wrong</Text>
        ) : (
          data?.map((job) => (
            <NearbyJobCard
              job={job}
              key={`nearby-jobs-${job.job_id}`}
              handleNavigate={() => {
                router.push(`/jobs/job-details/${job.job_id}`);
              }}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
