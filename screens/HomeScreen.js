import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../Context/AuthContextProvider";
import { API_BASE_URL } from "../constants/constants";
const HomeScreen = () => {
  const navigation = useNavigation();
  const { userToken } = useContext(AuthContext);
  const [centres, setCentres] = useState([]);

  useEffect(() => {
    const fetchCentres = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/centres?page=0&size=20`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setCentres(data._embedded.centres);
        } else {
          console.error("Error fetching centre data:", data);
        }
      } catch (error) {
        console.error("Error fetching centre data:", error);
      }
    };
    fetchCentres();
  }, [userToken]); 

  const handleCentrePress = (centreId) => {
    navigation.navigate("RendezVousScreen", { selectedCentreId: centreId });
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("isAuthenticated");
    navigation.navigate("Login");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <FlatList
        data={centres}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCentrePress(item.resourceId)}>
            <View style={styles.item}>
              <Text>{item.nom}</Text>
              <Text>{item.adresse}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.flatListContainer}
      />
      {/* <Button title="Log Out" onPress={handleLogout} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    width: "100%", 
    paddingHorizontal: 30, 
  },
  item: {
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: "#ABEBC6",
    height: 56,
    alignContent: "center",
    paddingLeft: 18,
    fontSize: 18,
    borderRadius: 14,
  },
});

export default HomeScreen;
