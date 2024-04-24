import React, { useState } from "react";
import { HomeScreenStack } from "./screens/folder/HomeStack";
import { AuthScreenStack } from "./screens/folder/AuthStack";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import store from "./store";
import AuthStack from "./navigation/AuthStack";
import WelcomeNavigator from "./navigation/WelcomeNavigator";
import TokenDisplay from "./screens/TokenDisplay";
const Stack = createStackNavigator();
export default function App() {
  const [auth, setAuth] = useState(true);
  const [loading, setLoading] = useState(true);
  return (
    <Provider store={store}>
      <NavigationContainer>
        {auth ? <HomeScreenStack /> : <AuthScreenStack />}
      </NavigationContainer>
    </Provider>
  );
}






// // App.js

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { Provider } from 'react-redux';
// import store from './store';
// import AuthStack from './navigation/AuthStack';
// import WelcomeNavigator from './navigation/WelcomeNavigator';
// import TokenDisplay from './screens/TokenDisplay';
// const Stack = createStackNavigator();

// const App = () => {
//   const userLoggedIn = false; // Set this based on the user's authentication status

//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName={userLoggedIn ? 'WelcomeNavigator' : 'AuthStack'} screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="AuthStack" component={AuthStack} />
//           <Stack.Screen name="WelcomeNavigator" component={WelcomeNavigator} />
//           <Stack.Screen name="TokenDisplay" component={TokenDisplay} />

//         </Stack.Navigator>
//       </NavigationContainer>
//     </Provider>
//   );
// };

// export default App;
