import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getFormatedDate } from "react-native-modern-datepicker";
import { useNavigation, useRoute } from "@react-navigation/native";
const dateIcon = require("../assets/datePicker1.png");

export default function RendezVousScreen() {
  const route = useRoute(); 

  const navigation = useNavigation();
  const [centreData, setCentreData] = useState([]);
  const [creneauData, setCreneauData] = useState([]);
  const [selectedCentre, setSelectedCentre] = useState(null);
  const [selectedCreneau, setSelectedCreneau] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const selectedCentreId = route.params.selectedCentreId;

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  useEffect(() => {
  
    // Fetch centres data
    fetch("https://a8f2-105-66-133-228.ngrok-free.app/api/centres?page=0&size=20")
      .then((response) => response.json())
      .then((centreData) => {
        if (centreData._embedded && centreData._embedded.centres.length > 0) {
          setCentreData(centreData._embedded.centres);
          
          // Select the center based on selectedCentreId
          const selectedCentre = centreData._embedded.centres.find(
            (centre) => centre.resourceId === selectedCentreId
          );
          setSelectedCentre(selectedCentre);
  
          // Fetch creneaus for selected centre
          fetchCreneausForCentre(selectedCentreId);
        } else {
          console.error("No centres found in the response.");
        }
      })
      .catch((error) => console.error("Error fetching centre data:", error));
  }, [selectedCentreId]);
  
  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "YYYY/MM/DD"
  );

  const handleChange = (propDate) => {
    setDate(propDate);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    fetchCreneausForCentre(selectedCentre.resourceId, formattedDate);
  };

  const fetchCreneausForCentre = (centreId, formattedDate) => {
    fetch(`https://a8f2-105-66-133-228.ngrok-free.app/api/creneaus`)
      .then((response) => response.json())
      .then((creneauData) => {
        const filteredCreneaus = creneauData._embedded.creneaus.filter(
          (creneau) =>
            creneau.ressourceCentre.resourceId == centreId &&
            creneau.date === formattedDate
        );
        setCreneauData(filteredCreneaus);
      })
      .catch((error) =>
        console.error("Error fetching creneau data for centre:", error)
      );
  };

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

  return (
    <View style={{ flex: 1, marginTop: 20 }}>
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
              onPress={() => setSelectedCreneau(item)} // Handle creneau press
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
                  isVisible={true} // Always visible when datePickerVisible is true
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
                        ? "red"
                        : "white", // Apply different background color for selected centre
                    borderRadius: 20,
                  }}
                  onPress={() => handleCentrePress(item.resourceId)} // Handle centre press
                >
                  <Text>{item.nom}</Text>
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
                      <Text style={stylesTable.tableTitle}>ID:</Text>
                      <Text style={stylesTable.tableValue}>
                        {selectedCentre.resourceId}
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
                        Start/end Time:
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

            {selectedCentre &&
              selectedCreneau &&
              selectedDate && ( // Display submit button if all selections are made
                <TouchableOpacity
                  onPress={() => console.log("Submit button pressed")} // Add your submit function here
                  style={{
                    backgroundColor: "#99CCCC",
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
