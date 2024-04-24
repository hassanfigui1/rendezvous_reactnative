// import React from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
// import Login from '../screens/Login';
// import Welcome from '../screens/Welcome';
// import TokenDisplay from '../screens/TokenDisplay';

// const Drawer = createDrawerNavigator();
// const Tab = createBottomTabNavigator();

// function HomeTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="TokenDisplay" component={TokenDisplay} />
//       <Tab.Screen name="Welcome" component={Welcome} />

//     </Tab.Navigator>
//   );
// }

// const WelcomeNavigator = () => {
//   return (
//       <Drawer.Navigator initialRouteName="Home">
//         <Drawer.Screen name="Home" component={HomeTabs} options={{ drawerLabel: 'Screen One', headerShown: false }} />
//         <Drawer.Screen name="Welcome" component={Welcome} options={{ drawerLabel: 'Screen One', headerShown: false }} />
//         <Drawer.Screen name="TokenDisplay" component={TokenDisplay} options={{ drawerLabel: 'Screen One', headerShown: false }} />

//         {/* Other screens */}
//       </Drawer.Navigator>
//   );
// };

// export default WelcomeNavigator;
