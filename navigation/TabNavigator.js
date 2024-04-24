// import React from 'react';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

// import HomeScreen from '../screens/Game/HomeScreen';
// import CartScreen from '../screens/Game/CartScreen';
// import FavoriteScreen from '../screens/Game/FavoriteScreen';
// import GameDetailsScreen from '../screens/Game/GameDetailsScreen';

// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Feather from 'react-native-vector-icons/Feather';

// const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();
// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Home!</Text>
//     </View>
//   );
// }

// function SettingsScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Settings!</Text>
//     </View>
//   );
// }
// const HomeStack = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="SettingsScreen"
//         component={SettingsScreen}
//         options={{headerShown: false}}
//       />
//       <Stack.Screen
//         name="HomeScreen"
//         component={HomeScreen}
//         options={({route}) => ({
//           title: route.params?.title,
//         })}
//       />
//     </Stack.Navigator>
//   );
// };

// const TabNavigator = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarShowLabel: false,
//         tabBarStyle: {backgroundColor: '#AD40AF'},
//         tabBarInactiveTintColor: '#fff',
//         tabBarActiveTintColor: 'yellow',
//       }}>
//       <Tab.Screen
//         name="SettingsScreen"
//         component={SettingsScreen}
//         options={({route}) => ({
//           tabBarStyle: {
//             display: getTabBarVisibility(route),
//             backgroundColor: '#AD40AF',
//           },
//           tabBarIcon: ({color, size}) => (
//             <Ionicons name="home-outline" color={color} size={size} />
//           ),
//         })}
//       />
//     </Tab.Navigator>
//   );
// };

// const getTabBarVisibility = route => {
//   // console.log(route);
//   const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
//   // console.log(routeName);

//   if( routeName == 'GameDetails' ) {
//     return 'none';
//   }
//   return 'flex';
// };

// export default TabNavigator;
