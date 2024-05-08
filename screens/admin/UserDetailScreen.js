import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Button } from 'react-native';

const UserDetailScreen = ({ route }) => {
  const { user } = route.params;

  const [editMode, setEditMode] = useState(false);

  const [editedUser, setEditedUser] = useState(user);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (key, value) => {
    setEditedUser({ ...editedUser, [key]: value });
  };

  const handleSubmit = () => {
    console.log('Updated user:', editedUser);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>User Detail</Text>
      {editMode ? (
        <View>
          <TextInput
            value={editedUser.username}
            onChangeText={(text) => handleInputChange('username', text)}
            placeholder="Username"
          />
          <TextInput
            value={editedUser.name}
            onChangeText={(text) => handleInputChange('name', text)}
            placeholder="Name"
          />
          <TextInput
            value={editedUser.role}
            onChangeText={(text) => handleInputChange('role', text)}
            placeholder="Role"
          />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>Enabled:</Text>
            <Switch
              value={editedUser.accountNonExpired}
              onValueChange={(value) => handleInputChange('accountNonExpired', value)}
            />
          </View>
          <Button title="Save" onPress={handleSubmit} />
        </View>
      ) : (
        <View>
          <Text>Username: {user.username}</Text>
          <Text>Name: {user.name}</Text>
          <Text>Role: {user.role}</Text>
          <Text>Enabled: {user.accountNonExpired ? 'Yes' : 'No'}</Text>
        </View>
      )}
      <View style={{ marginTop: 20 }}>
        <Switch value={editMode} onValueChange={toggleEditMode} />
        <Text>Enable Edit Mode</Text>
      </View>
    </View>
  );
};

export default UserDetailScreen;
