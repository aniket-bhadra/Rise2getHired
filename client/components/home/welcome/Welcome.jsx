import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

import { icons, SIZES } from "../../../constants";

import styles from "./welcome.style";
import { useRouter } from "expo-router";

const jobTypes = ["Full-time", "Part-time", "Contractor"];
import { TimerContext } from "../../../context/TimerContext";
import { useContext } from "react";
const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState("Full-time");
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const { user } = useContext(TimerContext);

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello {user?.name}</Text>
        <Text style={styles.welcomeMessage}>Find Your Perfect Job</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={localSearchTerm}
            onChangeText={(text) => setLocalSearchTerm(text)}
            placeholder="Dream job? Let's find it!"
          />
        </View>

        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => {
            if (localSearchTerm) {
              router.push(`/jobs/search/${localSearchTerm}`);
            }
          }}
        >
          <Image
            source={icons.search}
            style={styles.searchBtnImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.tab(activeJobType, item)}
                onPress={() => {
                  setActiveJobType(item);
                  router.push(`/jobs/search/${item}`);
                }}
              >
                <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;
