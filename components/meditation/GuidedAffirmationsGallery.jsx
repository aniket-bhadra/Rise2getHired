import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import { Link } from "expo-router";

const GuidedAffirmationsGallery = ({ title, previews }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={previews}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Link href={`/meditation/DynamicAffirmationScreens/${item.id}`} asChild>
              <Pressable>
                <View style={styles.imageContainer}>
                  <Image
                    source={item.image}
                    resizeMode="cover"
                    style={styles.image}
                  />
                </View>
              </Pressable>
            </Link>
          )}
          horizontal
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  titleContainer: {
    marginBottom: 8,
  },
  title: {
    color: "#312651",
    fontWeight: "bold",
    fontSize: 20,
  },
  listContainer: {
    gap: 8,
  },
  imageContainer: {
    height: 144,
    width: 128,
    borderRadius: 8,
    marginRight: 16,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default GuidedAffirmationsGallery;
