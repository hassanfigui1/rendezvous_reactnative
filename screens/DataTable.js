import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { DataTable } from 'react-native-paper';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { AuthContext } from '../Context/AuthContextProvider';
import { API_BASE_URL } from '../constants/constants';

const UsersTable = () => {
  const { userToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [numberOfItemsPerPageList] = useState([6, 8, 10]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/users`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      const data = await response.json();
      setUsers(data._embedded.users);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching users:', error);
      setLoading(false);
    }
  }, [userToken]);

  useEffect(() => {
    if (isFocused) {
      fetchUsers();
    }
  }, [isFocused, fetchUsers]);

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setPage(0);
  };

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, users.length);

  const navigateToUserDetail = (user) => {
    navigation.navigate('UserDetailScreen', { user });
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Username</DataTable.Title>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Role</DataTable.Title>
          <DataTable.Title>Enabled</DataTable.Title>
          <DataTable.Title>Edit</DataTable.Title>
        </DataTable.Header>
        {users.slice(from, to).map((user) => (
          <TouchableOpacity key={user.username} onPress={() => navigateToUserDetail(user,{ user })}>
            <DataTable.Row>
              <DataTable.Cell>{user.username}</DataTable.Cell>
              <DataTable.Cell>{user.name}</DataTable.Cell>
              <DataTable.Cell>{user.role}</DataTable.Cell>
              <DataTable.Cell>{user.accountNonExpired}</DataTable.Cell>
              <DataTable.Cell>Edit</DataTable.Cell>
            </DataTable.Row>
          </TouchableOpacity>
        ))}
      </DataTable>
      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(users.length / itemsPerPage)}
        onPageChange={setPage}
        label={`${from + 1}-${to} of ${users.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={'Rows per page'}
      />
    </View>
  );
};

export default UsersTable;
