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
    backgroundColor: "#f0ae6d",
    padding: 12,
    borderRadius: 10,
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
});
