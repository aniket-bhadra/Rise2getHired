import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import AFFIRMATION_GALLERY from "../../../constants/meditationData/affirmation-gallery";
import GuidedAffirmationsGallery from "../../../components/meditation/GuidedAffirmationsGallery";

const Affirmation = () => {
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <Text style={styles.headerText}>
            Boost Your Confidence in Every Job Phase
          </Text>
        }
        data={AFFIRMATION_GALLERY}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <GuidedAffirmationsGallery title={item.title} previews={item.data} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    color: "#116461",
    fontSize: 32,
    fontWeight: "bold",
  },
});

export default Affirmation;
