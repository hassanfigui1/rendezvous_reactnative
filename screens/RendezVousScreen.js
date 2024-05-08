import React, { useState, useEffect, useContext, useCallback } from "react";
import { View, FlatList, TouchableOpacity, Image } from "react-native";
import { StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getFormatedDate } from "react-native-modern-datepicker";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import { AuthContext } from "../Context/AuthContextProvider";
import { Card, Text, Snackbar } from "react-native-paper";
import axios from "axios";

import Header from "../components/Header";
const dateIcon = require("../assets/datePicker1.png");
import { API_BASE_URL } from "../constants/constants";

export default function RendezVousScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { userToken, user } = useContext(AuthContext);
  const [centreData, setCentreData] = useState([]);
  const [creneauData, setCreneauData] = useState([]);
  const [selectedCentre, setSelectedCentre] = useState(null);
  const [selectedCreneau, setSelectedCreneau] = useState(null);
  const [selectedDate, setSelectedDate] = useState();
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const selectedCentreId = route.params?.selectedCentreId || 0;
  const isFocused = useIsFocused();

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const onDismissSnackBar = () => setVisibleSnackbar(false);

  const fetchRendezVousData = useCallback(() => {
    axios
      .get(`${API_BASE_URL}/api/centres?page=0&size=20`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        const centreData = response.data;
        if (centreData._embedded && centreData._embedded.centres.length > 0) {
          setCentreData(centreData._embedded.centres);
          let selectedCentre = centreData._embedded.centres.find(
            (centre) => centre.resourceId === selectedCentreId
          );
          if (!selectedCentre) {
            selectedCentre = centreData._embedded.centres[0];
            setSelectedCentre(selectedCentre);
          } else {
            setSelectedCentre(selectedCentre);
          }
          fetchCreneausForCentre(selectedCentre.resourceId, startDate);
        } else {
          console.log("No centres found in the response.");
        }
      })
      .catch((error) => console.log("Error fetching centre data:", error));
  }, [selectedCentreId, userToken, startDate]);

  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "YYYY/MM/DD"
  );

  const handleChange = (propDate) => {
    setDate(propDate);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    if (selectedCentre) {
      // Add this check
      fetchCreneausForCentre(selectedCentre.resourceId, formattedDate);
    } else {
      console.log("No centre selected.");
    }
  };

  const fetchCreneausForCentre = (centreId, formattedDate) => {
    if (!formattedDate) {
      const currentDate = new Date();
      formattedDate = currentDate.toISOString().split("T")[0];
    }

    axios
      .get(`${API_BASE_URL}/api/centres/${centreId}/creneaus`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        const creneauData = response.data;
        if (creneauData._embedded && creneauData._embedded.creneaus) {
          const filteredCreneaus = creneauData._embedded.creneaus.filter(
            (creneau) => creneau.date === formattedDate
          );
          setCreneauData(filteredCreneaus);
        } else {
          setCreneauData([]);
          console.log(
            "No creneaus found or data structure is not as expected:",
            creneauData
          );
        }
      })
      .catch((error) => {
        console.log("Error fetching creneau data for centre:", error);
      });
  };

  useEffect(() => {
    if (isFocused) {
      fetchRendezVousData();
    }
  }, [isFocused, fetchRendezVousData]);

  const handleOnPress = () => {
    showDatePicker();
  };

  const handleCentrePress = (centreId) => {
    const selectedCentre = centreData.find(
      (centre) => centre.resourceId === centreId
    );
    setSelectedCentre(selectedCentre);

    fetchCreneausForCentre(centreId);
  };

  const navigateToHome = () => {
    navigation.navigate("HomeScreen");
  };

  const handleSubmit = () => {
    console.log(user);
    if (!selectedDate || !selectedCentre || !selectedCreneau || !user) {
      console.log("Please select a date, centre, creneau, and user.");
      return;
    }

    const formattedDate = selectedDate.toISOString().split("T")[0];
    const requestData = {
      date: formattedDate,
      centre: `${API_BASE_URL}/api/centres/${selectedCentre.resourceId}`,
      creneau: `${API_BASE_URL}/api/creneaus/${selectedCreneau.resourceId}`,
      user: `${API_BASE_URL}/users/${user.resourceId}`,
    };

    console.log("Request Data:", requestData);

    axios
      .post(`${API_BASE_URL}/api/rendezvous`, requestData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        console.log("POST request successful:", response.data);
        console.log("RendezVous created successfully:", response.data);
        setSnackbarMessage("RendezVous created successfully!");
        setVisibleSnackbar(true);
        // navigation.navigate('MesRendezvous');
      })
      .catch((error) => {
        console.log("Error sending POST request:", error);
        setSnackbarMessage('Failed to create RendezVous. Please try again.');

        setVisibleSnackbar(true);

      });
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <FlatList
        data={creneauData}
        numColumns={2}
        columnWrapperStyle={{ gap: 10, paddingHorizontal: 12 }}
        contentContainerStyle={{ gap: 10, paddingBottom: 20 }}
        keyExtractor={(item, idx) => item.resourceId + idx}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                backgroundColor:
                  selectedCreneau &&
                  selectedCreneau.resourceId === item.resourceId
                    ? "#CCFFFF"
                    : "white",
                flex: 1,
                height: 40,
                borderRadius: 20,
              }}
              onPress={() => setSelectedCreneau(item)}
            >
              <Text style={{ color: "black" }}>
                {item.heureDebut} - {item.heureFin}
              </Text>
            </TouchableOpacity>
          );
        }}
        ListHeaderComponentStyle={{ marginVertical: 0 }}
        ListHeaderComponent={() => (
          <View>
            <View
              style={{ flexDirection: "row", paddingVertical: 5 }}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 10, paddingHorizontal: 12 }}
            >
              {datePickerVisible && (
                <DateTimePickerModal
                  isVisible={true}
                  mode="date"
                  date={selectedDate}
                  minimumDate={new Date()}
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
              )}
            </View>
            <FlatList
              horizontal={true}
              style={{ paddingVertical: 5 }}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 10, paddingHorizontal: 12 }}
              data={centreData}
              keyExtractor={(item, idx) => item.resourceId + idx}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    width: 140,
                    height: 65,
                    backgroundColor:
                      selectedCentre &&
                      selectedCentre.resourceId === item.resourceId
                        ? "#2A6A94"
                        : "white",
                    borderRadius: 20,
                  }}
                  onPress={() => handleCentrePress(item.resourceId)} // Handle centre press
                >
                  <Text style={{color :selectedCentre &&
                      selectedCentre.resourceId === item.resourceId
                        ? "white"
                        : "black"}}>{item.nom}</Text>
                </TouchableOpacity>
              )}
            />
            <View
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                paddingHorizontal: 12,
                marginTop: 2,
                
              }}
            >
              <TouchableOpacity onPress={handleOnPress}>
                <Image source={dateIcon} style={{ width: 24, height: 24 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={navigateToHome}>
                <Text style={{ color: "red" }}>See All</Text>
              </TouchableOpacity>
            </View>

            <View style={stylesTable.container}>
              {selectedCentre && selectedCreneau && selectedDate && (
                <View style={{ paddingHorizontal: 12, marginTop: 15 }}>
                  <Text style={{ fontWeight: "bold" }}>Rendez Vous:</Text>
                  <View style={stylesTable.tableRow}>
                    <View style={stylesTable.tableColumn}>
                      <Text style={stylesTable.tableTitle}>ID Centre:</Text>
                      <Text style={stylesTable.tableValue}>
                        {selectedCentre.resourceId} ---- {user.resourceId}
                      </Text>
                    </View>
                    <View style={stylesTable.tableColumn}>
                      <Text style={stylesTable.tableTitle}>Name:</Text>
                      <Text style={stylesTable.tableValue}>
                        {selectedCentre.nom}
                      </Text>
                    </View>
                  </View>
                  <View style={stylesTable.tableRow}>
                    <View style={stylesTable.tableColumn}>
                      <Text style={stylesTable.tableTitle}>Address:</Text>
                      <Text style={stylesTable.tableValue}>
                        {selectedCentre.adresse}
                      </Text>
                    </View>
                    <View style={stylesTable.tableColumn}>
                      <Text style={stylesTable.tableTitle}>
                        {selectedCreneau.resourceId}Start/end Time:
                      </Text>
                      <Text style={stylesTable.tableValue}>
                        {selectedCreneau.heureDebut} -{" "}
                        {selectedCreneau.heureFin}
                      </Text>
                    </View>
                  </View>
                  <View style={stylesTable?.tableRow}>
                    <View style={stylesTable?.tableColumn}>
                      <Text style={stylesTable?.tableTitle}>Date:</Text>
                      <Text style={stylesTable?.tableValue}>
                        {selectedDate ? selectedDate.toDateString() : ""}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </View>

            {selectedCentre && selectedCreneau && selectedDate && (
              <TouchableOpacity
                onPress={handleSubmit}
                style={{
                  backgroundColor: "#2A6A94",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 10,
                  alignSelf: "center",
                  marginTop: 15,
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Submit
                </Text>
              </TouchableOpacity>
            )}
            <Snackbar
              visible={visibleSnackbar}
              onDismiss={onDismissSnackBar}
              duration={3000}
            >
              {snackbarMessage}
            </Snackbar>
          </View>
        )}
      />
    </View>
  );
}

const stylesTable = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 8,
  },
  tableRow: {
    flexDirection: "row",
    marginTop: 5,
  },
  tableColumn: {
    flex: 1,
  },
  tableTitle: {
    fontWeight: "bold",
  },
  tableValue: {},
});
