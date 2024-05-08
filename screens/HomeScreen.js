import React, { useState, useEffect, useContext } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../Context/AuthContextProvider";
import { API_BASE_URL } from "../constants/constants";
import { Avatar, Card, Text } from 'react-native-paper';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { userToken } = useContext(AuthContext);
  const [centres, setCentres] = useState([]);
  const numColumns = 2; // You can change this to 2 if you prefer two columns instead

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
          console.log("Error fetching centre data:", data);
        }
      } catch (error) {
        console.log("Error fetching centre data:", error);
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

  const LeftContent = props => <Avatar.Icon {...props}/>

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={centres}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCentrePress(item.resourceId)} style={styles.cardContainer}>
            <Card style={styles.card}>
              <Card.Title
                title={item.nom}
                subtitle={item.adresse}
              />
            </Card>
          </TouchableOpacity>
        )}
        numColumns={numColumns}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  cardContainer: {
    flex: 1 / 2, // Adjust the flex divisor to change column count (1 / numColumns)
    padding: 5,
  },
  card: {
    flex: 1,
    borderRadius: 10,
  },
});

export default HomeScreen;
