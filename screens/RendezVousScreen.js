import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Modal } from "react-native";

export default function RendezVousScreen() {
  const [centreData, setCentreData] = useState([]);
  const [creneauData, setCreneauData] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Fetch data from API for centres
    fetch("http://localhost:8080/api/centres?page=0&size=20")
      .then((response) => response.json())
      .then((centreData) => {
        setCentreData(centreData._embedded.centres);
      })
      .catch((error) => console.error("Error fetching centre data:", error));

    // Fetch data from API for creneaus
    fetch("http://localhost:8080/api/creneaus?page=0&size=20")
      .then((response) => response.json())
      .then((creneauData) => {
        setCreneauData(creneauData._embedded.creneaus);
      })
      .catch((error) => console.error("Error fetching creneau data:", error));
  }, []);

  const handleOnPress = () => {
    setOpen(!open);
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
          const associatedCentre = centreData.find(
            (centre) => centre.resourceId === item.ressourceCentre.resourceId
          );
          return (
            <TouchableOpacity
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                backgroundColor: "#F1F1F1",
                flex: 1,
                height: 200,
                borderRadius: 20,
              }}
            >
              <Text style={{ color: "black" }}>
                {item.heureDebut} - {item.heureFin}
              </Text>
            </TouchableOpacity>
          );
        }}
        ListHeaderComponentStyle={{ marginVertical: 10 }}
        ListHeaderComponent={() => (
          <View>
            <View
              style={{ flexDirection: "row", paddingVertical: 5 }}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 10, paddingHorizontal: 12 }}
            >
              <Text>Hello world !</Text>
              <TouchableOpacity onPress={handleOnPress}>
                <Text>Open</Text>
              </TouchableOpacity>
              <Modal animationType="slide" transparent={true} visible={open}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <TouchableOpacity onPress={handleOnPress}>
                        <Text>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
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
                    backgroundColor: "rgb(229, 232, 234)",
                    // borderRadius: 20,
                  }}
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
                marginTop: 15,
              }}
            >
              <Text style={{ fontWeight: "300" }}> Popular </Text>
              <Text style={{ color: "BLUE" }}>See All</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: '90%', // Corrected width value
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
