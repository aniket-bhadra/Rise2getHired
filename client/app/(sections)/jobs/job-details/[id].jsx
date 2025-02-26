import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { apiBaseUrl } from "../../../../config/config";
import { TimerContext } from "../../../../context/TimerContext";
import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../../../components";
import { COLORS, icons, SIZES } from "../../../../constants";

//! uncomment this
import { useFetch } from "../../../../hook/useFetch";

//! remove this
// import data from "../../../../mockJobDetails.json";

const tabs = ["About", "Qualifications", "Responsibilities", "Benefits"];

const JobDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user, setUser } = useContext(TimerContext);
  //! uncomment this
  const { data, isLoading, error } = useFetch("job-details", { job_id: id });
  // const isLoading = false;
  // const error = null;
  const [activeTab, setActiveTab] = useState(tabs[0]);

  // Update last browsed job when page loads
  useEffect(() => {
    const updateLastBrowsedJob = async () => {
      if (!user?._id || !data[0]) return;

      try {
        const response = await axios.post(
          `${apiBaseUrl}/api/user/update-last-browsed`,
          {
            userId: user._id,
            job: {
              job_id: data[0]?.job_id,
              job_title: data[0]?.job_title,
              employer_name: data[0]?.employer_name,
            },
            updateCount: 1, // Increment count
          }
        );
        setUser(response.data.user);
      } catch (error) {
        console.log("Error updating last browsed job:", error);
      }
    };

    updateLastBrowsedJob();
  }, [data]);

  const displayTabContent = () => {
    if (!data[0]) return <Text>Loading job details...</Text>;
    switch (activeTab) {
      case "Qualifications":
        return (
          <Specifics
            title="Qualifications"
            points={data[0].job_highlights?.Qualifications ?? ["N/A"]}
          />
        );
      case "About":
        return (
          <JobAbout info={data[0].job_description ?? "No Data Provided"} />
        );
      case "Responsibilities":
        return (
          <Specifics
            title="Responsibilities"
            points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
          />
        );
      case "Benefits":
        return (
          <Specifics
            title="Benefits"
            points={data[0].job_highlights?.Benefits ?? ["N/A"]}
          />
        );
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#a2b8a0" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something Went Wrong</Text>
        ) : data.length === 0 ? (
          <Text>No Data Available</Text>
        ) : (
          <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
            <Company
              companyLogo={data[0].employer_logo}
              jobTitle={data[0].job_title}
              companyName={data[0].employer_name}
              location={data[0].job_country}
              postedAt={data[0].job_posted_at}
            />
            <JobTabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            {displayTabContent()}
          </View>
        )}
      </ScrollView>
      <JobFooter
        url={
          data[0]?.job_google_link ?? "https://careers.google.com/jobs/results"
        }
        job={data[0] || {}} // Provide a default empty object if data[0] is undefined
      />
    </SafeAreaView>
  );
};

export default JobDetails;
