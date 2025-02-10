import React from "react";
import { View, Text, Image } from "react-native";

import styles from "./company.style";

import { icons } from "../../../constants";
const Company = ({ companyLogo, jobTitle, companyName, location }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image
          source={{
            uri: companyLogo
              ? companyLogo
              : "https://cdn.pixabay.com/photo/2018/08/11/20/19/jobs-3599406_1280.png",
          }}
          style={styles.logoImage}
        />
      </View>

      <View style={styles.jobTitleBox}>
        <Text style={styles.jobTitle}>{jobTitle}</Text>
      </View>
      <View style={styles.companyInfoBox}>
        <Text style={styles.companyName}>{companyName} / </Text>
        <View style={styles.locationBox}>
          <Image
            source={icons.location}
            resizeMode="contain"
            style={styles.locationImage}
          />
        </View>
        <Text style={styles.locationName}>{location}</Text>
      </View>
    </View>
  );
};

export default Company;
