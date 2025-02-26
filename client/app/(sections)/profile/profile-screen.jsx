import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { TimerContext } from "../../../context/TimerContext";
import { useContext } from "react";
import { useRouter } from "expo-router";

const ProfileCard = ({ title, count, onPress, icon }) => (
  <TouchableOpacity style={profileStyles.card} onPress={onPress}>
    <View style={profileStyles.cardHeader}>
      <Ionicons name={icon} size={24} color="#116461" />
      <Text style={profileStyles.cardTitle}>{title}</Text>
    </View>
    <View style={profileStyles.cardContent}>
      <Text style={profileStyles.cardCount}>{count}</Text>
      <Text style={profileStyles.cardSubtitle}>Items</Text>
    </View>
    <View style={profileStyles.cardFooter}>
      <Text style={profileStyles.viewAll}>View All</Text>
      <Ionicons name="chevron-forward" size={16} color="#116461" />
    </View>
  </TouchableOpacity>
);

const JobItem = ({ job }) => (
  <View style={profileStyles.jobItem}>
    <View style={profileStyles.jobIconContainer}>
      <Ionicons name="briefcase" size={24} color="#116461" />
    </View>
    <View style={profileStyles.jobDetails}>
      <Text style={profileStyles.jobTitle}>{job.title}</Text>
      <Text style={profileStyles.jobCompany}>{job.company}</Text>
    </View>
    <TouchableOpacity style={profileStyles.applyButton}>
      <Text style={profileStyles.applyButtonText}>Apply</Text>
    </TouchableOpacity>
  </View>
);

const AffirmationItem = ({ item }) => (
  <View style={profileStyles.affirmationItem}>
    <Text style={profileStyles.affirmationText}>{item.text}</Text>
    <TouchableOpacity style={profileStyles.saveButton}>
      <Ionicons name="bookmark" size={18} color="#fff" />
    </TouchableOpacity>
  </View>
);

const Profile = () => {
  const [showSavedJobs, setShowSavedJobs] = useState(false);
  const [showAffirmations, setShowAffirmations] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { user, setUser } = useContext(TimerContext);
  const router = useRouter();

  // Fix for last browsed job display
  const hasLastBrowsedJob = user?.lastBrowsedJob && user.lastBrowsedJob.job_id;
  
  // Get the last saved job (assuming MongoDB stores new documents at the end of array)
  const lastSavedJob = user?.savedJobs?.length > 0 
    ? user.savedJobs[user.savedJobs.length - 1] 
    : null;

  const toggleSavedJobs = () => {
    setShowSavedJobs(!showSavedJobs);
  };

  const toggleAffirmations = () => {
    setShowAffirmations(!showAffirmations);
  };

  const toggleLogoutModal = () => {
    setShowLogoutModal(!showLogoutModal);
  };

  const handleLogout = () => {
    setUser({
      name: "",
      email: "",
      pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      savedJobs: [],
      savedAffirmations: [],
      lastBrowsedJob: {},
      noOfJobsBrowsed: 0,
    });
    setShowLogoutModal(false);
    router.push("/");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#a2b8a0" }}>
      <ScrollView contentContainerStyle={profileStyles.container}>
        {/* Header and Avatar Section */}
        <View style={profileStyles.header}>
          <TouchableOpacity
            style={profileStyles.settingsButton}
            onPress={toggleLogoutModal}
          >
            <Ionicons name="settings-outline" size={24} color="#116461" />
          </TouchableOpacity>

          <View style={profileStyles.avatarContainer}>
            <Image source={{ uri: user.pic }} style={profileStyles.avatar} />
          </View>

          <Text style={profileStyles.userName}>{user.name}</Text>
          <Text style={profileStyles.userEmail}>{user.email}</Text>
        </View>

        {/* User Stats */}
        <View style={profileStyles.statsContainer}>
          <View style={profileStyles.statItem}>
            <Text style={profileStyles.statValue}>
              {user?.savedJobs?.length}
            </Text>
            <Text style={profileStyles.statLabel}>Saved Jobs</Text>
          </View>
          <View style={profileStyles.statDivider} />
          <View style={profileStyles.statItem}>
            <Text style={profileStyles.statValue}>
              {user?.savedAffirmations?.length}
            </Text>
            <Text style={profileStyles.statLabel}>Affirmations</Text>
          </View>
          <View style={profileStyles.statDivider} />
          <View style={profileStyles.statItem}>
            <Text style={profileStyles.statValue}>{user?.noOfJobsBrowsed}</Text>
            <Text style={profileStyles.statLabel}>Jobs Viewed</Text>
          </View>
        </View>

        {/* Cards Section */}
        <View style={profileStyles.cardsSection}>
          <ProfileCard
            title="Saved Jobs"
            count={user?.savedJobs?.length}
            icon="briefcase"
            onPress={toggleSavedJobs}
          />

          {showSavedJobs && (
            <View style={profileStyles.expandedSection}>
              <FlatList
                data={user?.savedJobs}
                renderItem={({ item }) => <JobItem job={item} />}
                keyExtractor={(item) => item._id}
                scrollEnabled={false}
              />
              <TouchableOpacity style={profileStyles.seeMoreButton}>
                <Text style={profileStyles.seeMoreText}>See More</Text>
              </TouchableOpacity>
            </View>
          )}

          <ProfileCard
            title="Saved Affirmations"
            count={user?.savedAffirmations?.length}
            icon="sunny"
            onPress={toggleAffirmations}
          />

          {showAffirmations && (
            <View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={profileStyles.affirmationsContainer}
              >
                {user?.savedAffirmations.map((item, index) => (
                  <AffirmationItem key={`affirmations--${index}`} item={item} />
                ))}
              </ScrollView>
              <TouchableOpacity style={profileStyles.seeMoreButton}>
                <Text style={profileStyles.seeMoreText}>
                  See All Affirmations
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Activity Section - FIXED TOP MARGIN */}
        <View style={profileStyles.activitySection}>
          <Text style={profileStyles.sectionTitle}>Recent Activity</Text>
          
          {/* Last Browsed Job */}
          <View style={profileStyles.activityItem}>
            <View style={profileStyles.activityIconContainer}>
              <Ionicons name="time" size={20} color="#fff" />
            </View>
            
            {hasLastBrowsedJob ? (
              <View style={profileStyles.activityContent}>
                <Text style={profileStyles.activityTitle}>
                  {user.lastBrowsedJob.job_title && user.lastBrowsedJob.job_title.slice(0, 24)}
                </Text>
                <Text style={profileStyles.activitySubtitle}>
                  {user.lastBrowsedJob.employer_name}
                </Text>
              </View>
            ) : (
              <View style={profileStyles.activityContent}>
                <Text style={profileStyles.activityTitle}>Recent Job Views</Text>
                <Text style={profileStyles.activitySubtitle}>No Jobs Viewed</Text>
              </View>
            )}
          </View>
          
          {/* Last Saved Job */}
          <View style={profileStyles.activityItem}>
            <View
              style={[
                profileStyles.activityIconContainer,
                { backgroundColor: "#e58e40" },
              ]}
            >
              <Ionicons name="bookmark" size={20} color="#fff" />
            </View>
            
            {lastSavedJob ? (
              <View style={profileStyles.activityContent}>
                <Text style={profileStyles.activityTitle}>Saved a new job</Text>
                <Text style={profileStyles.activitySubtitle}>
                  {lastSavedJob.job_title} at {lastSavedJob.employer_name}
                </Text>
              </View>
            ) : (
              <View style={profileStyles.activityContent}>
                <Text style={profileStyles.activityTitle}>Saved Jobs</Text>
                <Text style={profileStyles.activitySubtitle}>No Saved Jobs</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Logout Modal */}
      <Modal
        transparent={true}
        visible={showLogoutModal}
        animationType="fade"
        onRequestClose={toggleLogoutModal}
      >
        <TouchableOpacity
          style={profileStyles.modalOverlay}
          activeOpacity={1}
          onPress={toggleLogoutModal}
        >
          <View style={profileStyles.logoutModalContainer}>
            <TouchableOpacity
              style={profileStyles.logoutButton}
              onPress={handleLogout}
            >
              <Ionicons name="log-out-outline" size={20} color="#fff" />
              <Text style={profileStyles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const profileStyles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    alignItems: "center",
    position: "relative",
    marginBottom: 20,
  },
  settingsButton: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: 8,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 12,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#fff",
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#e58e40",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#116461",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "#555",
    marginBottom: 16,
  },
  editProfileButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#116461",
    backgroundColor: "transparent",
  },
  editProfileText: {
    color: "#116461",
    fontSize: 12,
    fontWeight: "600",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#116461",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
  },
  statDivider: {
    width: 1,
    backgroundColor: "#ddd",
    height: "80%",
    alignSelf: "center",
  },
  cardsSection: {
    marginBottom: 10, // Reduced margin from 20 to 10
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#116461",
    marginLeft: 10,
  },
  cardContent: {
    marginBottom: 12,
  },
  cardCount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#666",
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewAll: {
    fontSize: 12,
    color: "#116461",
    fontWeight: "600",
    marginRight: 4,
  },
  expandedSection: {
    marginTop: -8,
    marginBottom: 16,
  },
  jobItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  jobIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#e8f0e7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  jobDetails: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  jobCompany: {
    fontSize: 12,
    color: "#666",
  },
  applyButton: {
    backgroundColor: "#e58e40",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  seeMoreButton: {
    alignItems: "center",
    paddingVertical: 8,
  },
  seeMoreText: {
    color: "#116461",
    fontWeight: "600",
    fontSize: 14,
  },
  affirmationsContainer: {
    marginTop: 8,
    marginBottom: 12,
  },
  affirmationItem: {
    backgroundColor: "#e8f0e7",
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 220,
    position: "relative",
    borderLeftWidth: 4,
    borderLeftColor: "#116461",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  affirmationText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 24,
    fontWeight: "500",
    fontStyle: "italic",
  },
  saveButton: {
    position: "absolute",
    bottom: 12,
    right: 12,
    backgroundColor: "#116461",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  activitySection: {
    marginBottom: 24,
    marginTop: 0, // Explicitly set marginTop to 0
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#116461",
    marginBottom: 12, // Reduced from 16 to 12
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  activityIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#116461",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  activitySubtitle: {
    fontSize: 12,
    color: "#666",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  logoutModalContainer: {
    position: "absolute",
    top: 60,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e58e40",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
  },
});

export default Profile;