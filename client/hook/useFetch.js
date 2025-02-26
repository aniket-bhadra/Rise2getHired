// const { useState } = require("react");
import { useEffect, useState } from "react";
import axios from "axios";
import { Alert } from "react-native";
import keys from "../secure";

const useFetch = (endPoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
// ! uncomment this
  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endPoint}`,
    headers: {
      "x-rapidapi-key": keys.RapidApiKey,
      "x-rapidapi-host": "jsearch.p.rapidapi.com",
    },
    params: {
      ...query,
    },
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      setData(response.data.data);
    } catch (error) {
      setError(error);
      Alert.alert("Oops! Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
  };
  return {
    data,
    error,
    isLoading,
    refetch,
  };
};

export { useFetch };
// params: {
//    query: "developer jobs in chicago",
//    page: "1",
//    num_pages: "1",
//    country: "us",
//    date_posted: "all",
//  },
