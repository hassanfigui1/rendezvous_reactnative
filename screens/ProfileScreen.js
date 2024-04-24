import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "react-native";
export function ProfileScreen() {
    return (
      <View style={styles.container}>
        <Text>This is the ProfileScreen page</Text>
        <StatusBar style="auto" />
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
  });
  