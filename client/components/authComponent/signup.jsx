import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  ScrollView,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import styles from "./styles";
import { useRouter } from "expo-router";
import avatarStyles from "./avatarStyles";
import avatars from "../../constants/avatars";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const handleSignup = () => {
    router.push("/jobs/jobs-home");
  };

  const handleSelectAvatar = (avatar) => {
    setSelectedAvatar(avatar);
    setModalVisible(false);
  };

  const renderAvatarItem = ({ item }) => (
    <TouchableOpacity
      style={[
        avatarStyles.avatarOption,
        selectedAvatar?.id === item.id && avatarStyles.selectedAvatarOption,
      ]}
      onPress={() => handleSelectAvatar(item)}
    >
      <Image source={{ uri: item.url }} style={avatarStyles.avatarImage} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={avatarStyles.avatarSelector}
        onPress={() => setModalVisible(true)}
      >
        {selectedAvatar ? (
          <View style={avatarStyles.selectedAvatarContainer}>
            <Image
              source={{ uri: selectedAvatar.url }}
              style={avatarStyles.selectedAvatar}
            />
            <Text style={avatarStyles.changeText}>Change Avatar</Text>
          </View>
        ) : (
          <Text style={avatarStyles.avatarSelectorText}>
            Choose Profile Avatar
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          (!name || !email || !password || !selectedAvatar) &&
            avatarStyles.disabledButton,
        ]}
        onPress={handleSignup}
        disabled={!name || !email || !password || !selectedAvatar}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={avatarStyles.modalContainer}>
          <View style={avatarStyles.modalContent}>
            <Text style={avatarStyles.modalTitle}>Select Your Avatar</Text>

            <FlatList
              data={avatars}
              renderItem={renderAvatarItem}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              contentContainerStyle={avatarStyles.avatarGrid}
            />

            <TouchableOpacity
              style={avatarStyles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={avatarStyles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
