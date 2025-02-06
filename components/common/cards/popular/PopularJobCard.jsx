import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./popularjobcard.style";
// import { checkImageURL } from "../../../../utils";

//! remove it
// const stylesssss = StyleSheet.create({
//   container: (selectedJob, item) => ({
//     width: 250,
//     padding: SIZES.xLarge,
//     backgroundColor: selectedJob === item.job_id ? COLORS.primary : "#FFF",
//     borderRadius: SIZES.medium,
//     justifyContent: "space-between",
//     ...SHADOWS.medium,
//     shadowColor: COLORS.white,
//   }),
//   logoContainer: (selectedJob, item) => ({
//     width: 50,
//     height: 50,
//     backgroundColor: selectedJob === item.job_id ? "#FFF" : COLORS.white,
//     borderRadius: SIZES.medium,
//     justifyContent: "center",
//     alignItems: "center",
//   }),
//   logoImage: {
//     width: "70%",
//     height: "70%",
//   },
//   companyName: {
//     fontSize: SIZES.medium,
//     fontFamily: FONT.regular,
//     color: "#B3AEC6",
//     marginTop: SIZES.small / 1.5,
//   },
//   infoContainer: {
//     marginTop: SIZES.large,
//   },
//   jobName: (selectedJob, item) => ({
//     fontSize: SIZES.large,
//     fontFamily: FONT.medium,
//     color: selectedJob === item.job_id ? COLORS.white : COLORS.primary,
//   }),
//   infoWrapper: {
//     flexDirection: "row",
//     marginTop: 5,
//     justifyContent: "flex-start",
//     alignItems: "center",
//   },
//   publisher: (selectedJob) => ({
//     fontSize: SIZES.medium - 2,
//     fontFamily: FONT.bold,
//     color: selectedJob === item.job_id ? COLORS.white : COLORS.primary,
//   }),
//   location: {
//     fontSize: SIZES.medium - 2,
//     fontFamily: FONT.regular,
//     color: "#B3AEC6",
//   },
// });

const PopularJobCard = ({ item, selectedJob, handleCardPress }) => {
  return (
    <TouchableOpacity
      style={styles.container(selectedJob, item)}
      onPress={() => handleCardPress(item)}
    >
      <TouchableOpacity style={styles.logoContainer(selectedJob, item)}>
        <Image
          source={{
            uri: item.employer_logo
              ? item.employer_logo
              : "https://cdn.pixabay.com/photo/2018/08/11/20/19/jobs-3599406_1280.png",
          }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <Text style={styles.companyName} numberOfLines={1}>
        {item.employer_name}
      </Text>
      <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedJob, item)} numberOfLines={1}>
          {item.job_title}
        </Text>
        <Text style={styles.location}>{item.job_country}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PopularJobCard;
