import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import AFFIRMATION_GALLERY from "../../../constants/meditationData/affirmation-gallery";
import GuidedAffirmationsGallery from "../../../components/meditation/GuidedAffirmationsGallery";

const Affirmation = () => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.headerText}>
          Change your beliefs with affirmation
        </Text>
        <View>
          {AFFIRMATION_GALLERY.map((g) => (
            <GuidedAffirmationsGallery
              key={g.title}
              title={g.title}
              previews={g.data}
            />
          ))}
        </View>
      </ScrollView>
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
