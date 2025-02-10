import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import styles from "./popularjobs.style";

//! remove this
import data from "../../../mockSearchData.json";

// !  import it, uncomment the option object inside useFetch
// import { useFetch } from "../../../hook/useFetch";

const Popularjobs = () => {
  const router = useRouter();
  const [selectedJob, setSelectedJob] = useState();

  // !  uncomment
  // const { isLoading, error, data } = useFetch("search", {
  //   query: "React developer",
  //   num_pages: 1,
  // });
  const isLoading = false;
  const error = null;

  const handleCardPress = (item) => {
    // ! uncomment this
    // router.push(`job-details/${item.job_id}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popularjobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something Went Wrong</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => {
              return (
                <PopularJobCard
                  item={item}
                  selectedJob={selectedJob}
                  handleCardPress={handleCardPress}
                />
              );
            }}
            keyExtractor={(item) => item?.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
