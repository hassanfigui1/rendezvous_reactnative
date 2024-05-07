import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreenStack } from "./HomeStack";
import { AuthScreenStack } from "./AuthStack";
import AuthContextProvider, { AuthContext } from "../../Context/AuthContextProvider";
const Stack = createStackNavigator();

export default function Manager() {
  return (
    <AuthContextProvider>
      <AuthNavigator />
    </AuthContextProvider>
  );
}

function AuthNavigator() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Screen name="Home" component={HomeScreenStack} />
        ) : (
          <Stack.Screen name="Auth" component={AuthScreenStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
