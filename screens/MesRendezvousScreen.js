import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { DataTable } from 'react-native-paper';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import { AuthContext } from "../Context/AuthContextProvider";
import { API_BASE_URL } from "../constants/constants";

const RendezvousTable = () => {
  const { userToken, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [rendezvousList, setRendezvousList] = useState([]);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [numberOfItemsPerPageList] = useState([4, 8, 12]);
  const isFocused = useIsFocused();

  const fetchRendezvous = useCallback(async () => {
    if (!userToken || !user || !user.resourceId) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/centres`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      const centres = response.data._embedded.centres;
      const userRendezvousList = centres.reduce((acc, centre) => {
        const rendezvous = centre.ressourceRdvs.filter(
          rdv => rdv.resourceUser.resourceId === user.resourceId
        );
        return [...acc, ...rendezvous];
      }, []);
      setRendezvousList(userRendezvousList);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching rendezvous:", error);
      setLoading(false);
    }
  }, [userToken, user]);

  useEffect(() => {
    if (isFocused) {
      fetchRendezvous();
    }
  }, [isFocused, fetchRendezvous]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, rendezvousList.length);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Date</DataTable.Title>
          <DataTable.Title>User</DataTable.Title>
          <DataTable.Title>Heure de début</DataTable.Title>
          <DataTable.Title>Heure de fin</DataTable.Title>
        </DataTable.Header>
        {rendezvousList.slice(from, to).map((rendezvous, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell>{rendezvous.date}</DataTable.Cell>
            <DataTable.Cell>{rendezvous.resourceUser.name}</DataTable.Cell>
            <DataTable.Cell>{rendezvous.ressourceCreneaus.heureDebut}</DataTable.Cell>
            <DataTable.Cell>{rendezvous.ressourceCreneaus.heureFin}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(rendezvousList.length / itemsPerPage)}
        onPageChange={setPage}
        label={`${from + 1}-${to} of ${rendezvousList.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
        showFastPaginationControls
        selectPageDropdownLabel={'Rows per page'}
      />
    </View>
  );
};

export default RendezvousTable;
