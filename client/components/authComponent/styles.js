import { StyleSheet } from "react-native";
import { FONT } from "../../constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#a2b8a0", //#dfdfa5
  },
  logoText: {
    fontSize: 25,
    marginBottom: 20,
    color: "#116461",
    fontFamily: FONT.bold,
  },
  formContainer: {
    width: "80%",
    position: "relative",
  },
  input: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#e58e40",
    padding: 12,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  switchText: {
    marginTop: 10,
    color: "#116461",
    fontWeight: "bold",
  },
  logo: {
    width: 260,
    height: 260,
    marginBottom: -30,
    resizeMode: "contain",
  },
  // Enhanced Loading spinner styles
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(17, 100, 97, 0.2)", // Brand color with transparency
    backdropFilter: "blur(3px)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    borderRadius: 15,
  },
  spinnerContainer: {
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(229, 142, 64, 0.3)", // Brand accent color with transparency
  },
  spinnerText: {
    color: "#116461",
    fontWeight: "bold",
    marginTop: 15,
    textAlign: "center",
    fontSize: 16,
  },
  spinnerInner: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  spinnerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#e58e40",
    margin: 3,
  },
  spinnerDotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
});
