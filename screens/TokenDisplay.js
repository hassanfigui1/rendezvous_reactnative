import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux'; // Import useSelector hook to access Redux store state

const TokenDisplay = () => {
  // Use useSelector hook to access the token from Redux store state
  const token = useSelector(state => state.auth.token);

  return (
    <View style={styles.container}>
      <Text style={styles.tokenText}>Token: {token} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tokenText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  token: {
    fontSize: 16,
    color: '#333',
  },
});

export default TokenDisplay;
