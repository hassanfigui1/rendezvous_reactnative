import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerScreenStack } from "./DrawerStack";
import { StatusBar } from "expo-status-bar";

function DetailScreen() {
  return (
    <View style={styles.container}>
      <Text>DetailScreen</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const HomeStack = createNativeStackNavigator();
export function HomeScreenStack() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="DrawerHome"
        component={DrawerScreenStack}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name="Detail" component={DetailScreen} />
    </HomeStack.Navigator>
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
