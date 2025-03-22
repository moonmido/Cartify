import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Signin from '../Signin';
import Splach from './Splach';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from '../Home';

const SplachChanger = () => {
  const [spla, setSpla] = useState(true);
  const [userTest, setUserTest] = useState(null);
  const [loading, setLoading] = useState(true); // To wait for AsyncStorage

  useEffect(() => {
    // Fetch userID from AsyncStorage
    const fetchUserID = async () => {
      try {
        const userID = await AsyncStorage.getItem("userID");
        setUserTest(userID); // Store userID in state
      } catch (error) {
        console.log("Error fetching userID:", error);
      }
      setLoading(false); // Stop loading once we get the userID
    };

    fetchUserID();

    // Hide splash after 1.5s
    const timer = setTimeout(() => {
      setSpla(false);
    }, 1500);

    return () => clearTimeout(timer); // Cleanup timeout
  }, []);

  const handleSwitch = () => {
    if (loading || spla) {
      return <Splach />; // Show splash while loading
    } else if (userTest) {
      return <Home />; // If user is signed in, go to Home
    } else {
      return <Signin />; // Otherwise, show Sign-in
    }
  };

  return <View style={{ flex: 1 }}>{handleSwitch()}</View>;
};

export default SplachChanger;
