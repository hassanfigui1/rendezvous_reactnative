import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const HomeScreen = () => {
  const navigation = useNavigation(); // Use useNavigation to get navigation object
  const [centres, setCentres] = useState([]);

  useEffect(() => {
    // Fetch centres data
    fetch('https://a8f2-105-66-133-228.ngrok-free.app/api/centres?page=0&size=20')
      .then(response => response.json())
      .then(data => setCentres(data._embedded.centres))
      .catch(error => console.error('Error fetching centre data:', error));
  }, []);

  const handleCentrePress = (centreId) => {
    navigation.navigate('RendezVousScreen', { selectedCentreId: centreId });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Centres</Text>
      <FlatList
        data={centres}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCentrePress(item.resourceId)}>
            <Text>{item.nom}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;
