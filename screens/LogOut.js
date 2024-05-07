import React from "react";
import { View, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";

export default LogoutScreen = ({ navigation }) => {
    // const dispatch = useDispatch(); // Initialize useDispatch hook
  
    const handleLogout = async () => {
      // Clear authentication token from AsyncStorage
      await AsyncStorage.removeItem("isAuthenticated");
  
      // Dispatch the logout action to clear user data from Redux store
  
      // Navigate back to the login screen
      navigation.navigate("Login");
    };
  
    return (
      <View >
        <Button title="Logout" onPress={handleLogout} />
      </View>
    );
  };
  