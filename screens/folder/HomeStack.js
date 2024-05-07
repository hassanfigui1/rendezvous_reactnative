import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerScreenStack } from "./DrawerStack";
import { StatusBar } from "expo-status-bar";
import HomeScreen from "../HomeScreen";
import RendezVousScreen from "../RendezVousScreen";

const HomeStack = createNativeStackNavigator();
export function HomeScreenStack() {
  return (
    <HomeStack.Navigator initialRouteName="DrawerHome">
      <HomeStack.Screen
        name="DrawerHome"
        component={DrawerScreenStack}
        options={{ headerShown: false }}
      />
      {/* <HomeStack.Screen name="HomeScreen" component={HomeScreen} /> */}
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
