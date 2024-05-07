import React, { useState, useEffect, useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { DataTable } from 'react-native-paper';
import { AuthContext } from '../Context/AuthContextProvider';
import { API_BASE_URL } from '../constants/constants';

const UsersTable = () => {
  const { userToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6); // Default items per page
  const [numberOfItemsPerPageList] = useState([6, 8, 10]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/users`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        const data = await response.json();
        setUsers(data._embedded.users);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [userToken]);

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setPage(0); // Reset to first page when items per page changes
  };

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, users.length);

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
          <DataTable.Title>enabled</DataTable.Title>
          <DataTable.Title>Edit</DataTable.Title>

        </DataTable.Header>
        {users.slice(from, to).map((user) => (
          <DataTable.Row key={user.username}>
            <DataTable.Cell>{user.username}</DataTable.Cell>
            <DataTable.Cell>{user.name}</DataTable.Cell>
            <DataTable.Cell>{user.role}</DataTable.Cell>
            <DataTable.Cell>{user.accountNonExpired}</DataTable.Cell>
            <DataTable.Cell>{user.name}</DataTable.Cell>

          </DataTable.Row>
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
