import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../constants";

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  searchTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
  },
  noOfSearchedJobs: {
    marginTop: 2,
    fontFamily: FONT.medium,
    fontSize: SIZES.small,
    color: COLORS.secondary,
  },
  loaderContainer: {
    marginTop: SIZES.medium,
  },
  footerContainer: {
    marginTop: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  paginationButton: {
    width: 30,
    height: 30,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e58e40",
  },
  paginationImage: {
    width: "60%",
    height: "60%",
    tintColor: COLORS.white,
  },
  paginationTextBox: {
    width: 30,
    height: 30,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderWidth:2,
    borderColor: "#116461"
  },
  paginationText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
  noJobsText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: "#e58e40",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
