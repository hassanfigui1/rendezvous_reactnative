import React from "react";
import {
  Button,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { StatusBar } from "expo-status-bar";
import { ProfileScreen } from "../ProfileScreen";
import Login from "../Login";
import RendezVousScreen from "../RendezVousScreen";

function MyModal({ isVisible, onClick }) {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="overFullScreen"
      transparent={false}
    >
      <SafeAreaView style={styles["modal-container"]}>
        <Text style={{ paddingTop: 20, fontSize: 22 }}>IN MODAL</Text>
        <Button onPress={onClick} title="CLOSE"></Button>
      </SafeAreaView>
    </Modal>
  );
}

function HomeScreen({ navigation }) {
  const [showModal, setShowModal] = React.useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="ADD" onPress={() => setShowModal(true)}></Button>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* MODAL */}
      <MyModal isVisible={showModal} onClick={() => setShowModal(false)} />
      {/* PAGE CONTENT */}
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button
        title="next page"
        onPress={() => navigation.navigate("Detail")}
      ></Button>
    </View>
  );
}


function CustomDrawerContent(props) {
  return (
    <>
      <View style={styles.drawerHeader}>
        <Text>HEADER</Text>
      </View>
      <DrawerContentScrollView {...props}>
        <View style={{ flex: 1 }}>
          <DrawerItemList {...props}></DrawerItemList>
        </View>
      </DrawerContentScrollView>
      <View style={{ marginBottom: 30 }}>
        <Button
          title="LOGOUT"
          onPress={() => {
            props.navigation.closeDrawer();
            // do logout code here...
          }}
        ></Button>
      </View>
    </>
  );
}
const DrawerStack = createDrawerNavigator();
export function DrawerScreenStack() {
  return (
    <DrawerStack.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <DrawerStack.Screen name="Home" component={HomeScreen} />
      <DrawerStack.Screen name="Profile" component={ProfileScreen} />
      <DrawerStack.Screen name="Login" component={Login} />
      <DrawerStack.Screen name="RendezVousScreen" component={RendezVousScreen} />

    </DrawerStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  "modal-container": {
    flex: 1,
    alignItems: "center",
    borderRadius: 18,
  },
  drawerHeader: {
    height: 100,
    backgroundColor: "#F1F1F1",
    margin: 10,
    marginTop: 0,
    marginBottom: 8,
    borderRadius: 8,
  },
});
