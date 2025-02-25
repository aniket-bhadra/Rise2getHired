import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";

const ApplyOptions = ({ applyOptions }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {applyOptions && (
          <Text style={styles.title}>Choose an Apply Option</Text>
        )}
        <FlatList
          data={applyOptions}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => item.publisher + index}
          renderItem={({ item }) => (
            <View style={styles.optionContainer}>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => Linking.openURL(item.applyLink)}
              >
                <Text style={styles.optionText}>{item.publisher}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 12,
    margin: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#116461",
    marginBottom: 16,
  },
  optionContainer: {
    marginRight: 20,
    alignItems: "center",
  },
  optionButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: "#e58e40",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  optionText: {
    color: "#e58e40",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ApplyOptions;
