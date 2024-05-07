import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { API_BASE_URL } from '../constants/constants';
const MesRendezvous = () => {
  const [rendezvousData, setRendezvousData] = useState([]);
  const [token, setToken] = useState(null); // Assuming token is stored in state

  useEffect(() => {
    // Fetch token from wherever it's stored in your app
    const fetchToken = async () => {
      // Code to fetch token, maybe from AsyncStorage or context
      const userToken = await AsyncStorage.getItem('userToken'); // Example using AsyncStorage
      setToken(userToken);
    };

    fetchToken();
  }, []);

  useEffect(() => {
    if (!token) return;

    fetch(`${API_BASE_URL}/api/rendezvous?page=0&size=103`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data._embedded && data._embedded.rDVs) {
          setRendezvousData(data._embedded.rDVs);

        } else {
          console.error('No rendezvous found in the response.');
        }
      })
      .catch((error) => console.error('Error fetching rendezvous data:', error));
  }, [token]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Mes Rendezvous</Text>
      <FlatList
        data={rendezvousData}
        keyExtractor={(item) => item.resourceId.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text>Date: {item.date}</Text>
            <Text>Centre: {item.resourceCentre.nom}</Text>
            <Text>Adresse: {item.resourceCentre.adresse}</Text>
            <Text>Heure Debut: {item.resourceCreneau.heureDebut}</Text>
            <Text>Heure Fin: {item.resourceCreneau.heureFin}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default MesRendezvous;
