import {
  View,
  Text,
  FlatList,
  Pressable,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import AppGradient from "../../../components/meditation/AppGradient";
import { StatusBar } from "expo-status-bar";
import { MEDITATION_DATA } from "../../../constants/meditationData/meditationData";
import MEDITATION_IMAGES from "../../../constants/meditationData/meditation-images";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { FONT } from "../../../constants";
import Affirmation from "./affirmation";

const NatureMeditate = () => {
  const [activeTab, setActiveTab] = useState("meditation");
  const router = useRouter();

  return (
    <View style={styles.container}>
      <AppGradient colors={["#161b2e", "#0a4d4a", "#766e67"]}>
        <View style={styles.header}>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === "meditation" && styles.activeTab,
              ]}
              onPress={() => setActiveTab("meditation")}
            >
              <MaterialCommunityIcons
                name="flower-tulip"
                size={22}
                style={[
                  styles.icon,
                  activeTab === "meditation" && styles.activeIcon,
                ]}
              />
              <Text
                style={[
                  styles.tabText,
                  activeTab === "meditation" && styles.activeTabText,
                ]}
              >
                Meditation
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === "affirmation" && styles.activeTab,
              ]}
              onPress={() => setActiveTab("affirmation")}
            >
              <Entypo
                name="open-book"
                size={22}
                style={[
                  styles.icon,
                  activeTab === "affirmation" && styles.activeIcon,
                ]}
              />
              <Text
                style={[
                  styles.tabText,
                  activeTab === "affirmation" && styles.activeTabText,
                ]}
              >
                Affirmation
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {activeTab === "meditation" ? (
          <>
            <Text style={styles.title}>Top Picks</Text>
            <FlatList
              data={MEDITATION_DATA.slice(0, 5)}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => router.push(`/meditate/${item.id}`)}
                  style={styles.horizontalItem}
                >
                  <ImageBackground
                    source={MEDITATION_IMAGES[item.id - 1]}
                    resizeMode="cover"
                    style={styles.imageBackground}
                  >
                    <LinearGradient
                      colors={["transparent", "rgba(0,0,0,0.8)"]}
                      style={styles.overlay}
                    >
                      <Text style={styles.Horizontal_itemTitle}>
                        {item.title}
                      </Text>
                    </LinearGradient>
                  </ImageBackground>
                </Pressable>
              )}
            />
            <Text style={styles.title}>Browse Sounds – Choose & Relax</Text>
            <FlatList
              style={styles.list}
              data={MEDITATION_DATA.slice(5, 13)}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={<View style={{ height: 80 }} />}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => router.push(`/meditate/${item.id}`)}
                  style={styles.item}
                >
                  <ImageBackground
                    source={MEDITATION_IMAGES[item.id - 1]}
                    resizeMode="cover"
                    style={styles.imageBackground}
                  >
                    <LinearGradient
                      colors={["transparent", "rgba(0,0,0,0.8)"]}
                      style={styles.overlay}
                    >
                      <Text style={styles.itemTitle}>{item.title}</Text>
                    </LinearGradient>
                  </ImageBackground>
                </Pressable>
              )}
            />
          </>
        ) : (
          <View style={styles.placeholderContainer}>
            <Affirmation />
          </View>
        )}
      </AppGradient>
      <StatusBar style="light" />
    </View>
  );
};

const styles = StyleSheet.create({
  // First Tab Styles
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    padding: 8,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    alignSelf: "center",
    justifyContent: "center",
    width: "90%",
    gap: 10,
  },
  tabButton: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    shadowColor: "#4FD1C5",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  tabText: {
    fontSize: 16,
    color: "#A0AEC0",
    fontWeight: "600",
    marginLeft: 6,
  },
  icon: {
    color: "#A0AEC0",
  },
  activeTab: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderColor: "#4FD1C5",
    shadowColor: "#4FD1C5",
    shadowOpacity: 0.6,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    transform: [{ scale: 1.05 }],
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  activeIcon: {
    color: "#fff",
  },

  // Header and Title
  header: {
    marginBottom: 14,
    // alignItems: "center",
  },
  title: {
    fontSize: 18,
    color: "#f0ae6d",
    marginBottom: 14,
    fontFamily: FONT.bold,
    letterSpacing: 1,
    // textAlign: "center",
    marginTop: 10,
  },

  // Horizontal List Styles
  horizontalItem: {
    width: 250,
    height: 200,
    marginRight: 14,
    borderRadius: 25,
    overflow: "hidden", // This ensures the content inside is clipped to the rounded shape
  },

  imageBackground: {
    flex: 1,
    borderRadius: 20, // Make sure the image respects the rounded corners
    overflow: "hidden", // Ensures image is clipped to the rounded container
    justifyContent: "flex-end",
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 12,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },

  // Horizontal List
  horizontalList: {
    // alignItems: "center",
    paddingBottom: 12,
  },
  Horizontal_itemTitle: {
    color: "#F3F4F6",
    fontSize: 19,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },

  // General List Styles
  list: {
    marginBottom: 8,
  },
  item: {
    height: 192,
    marginVertical: 7,
    borderRadius: 40,
    overflow: "hidden", // Ensure overflow is hidden to clip the content inside
  },
  imageBackground: {
    flex: 1,
    borderRadius: 8,
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemTitle: {
    color: "#F3F4F6",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },

  // Placeholder
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#C7D2FE",
    fontSize: 20,
  },

  // Subtitle
  subtitle: {
    color: "#C7D2FE",
    fontSize: 20,
    fontWeight: "500",
    marginTop: 12,
  },

  // Container
  container: {
    flex: 1,
  },
});

export default NatureMeditate;
