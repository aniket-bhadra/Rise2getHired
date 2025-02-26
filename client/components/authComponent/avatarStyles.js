import { StyleSheet } from "react-native";

const avatarStyles = StyleSheet.create({
  avatarSelector: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarSelectorText: {
    color: "#666",
  },
  selectedAvatarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectedAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  changeText: {
    color: "#116461",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "85%",
    maxHeight: "70%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#116461",
  },
  avatarGrid: {
    paddingVertical: 10,
  },
  avatarOption: {
    margin: 8,
    borderRadius: 40,
    padding: 3,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedAvatarOption: {
    borderColor: "#e58e40",
  },
  avatarImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  closeButton: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
  },
  closeButtonText: {
    color: "#116461",
    fontWeight: "bold",
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default avatarStyles;
