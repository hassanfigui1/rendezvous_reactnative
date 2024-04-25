import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import {View, Text, Button, StyleSheet} from 'react-native';
import LoginScreen from "../Login";

export function CreateAccountScreen(){
    return(
        <View styles={styles.container}>
            <Text>This is the detail Page</Text>
            <StatusBar style="auto" />
            <Button title="create account" onPress={()=>null}>

            </Button>
        </View>
    )
}

const AuthStack = createNativeStackNavigator();
export function AuthScreenStack() {
  return (
    <AuthStack.Navigator>
        <AuthStack.Screen name="Login" component={LoginScreen} />
        <AuthStack.Screen name="CreateAccount" component={CreateAccountScreen} />
    </AuthStack.Navigator>
  )}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        alignItems: "center",
        justifyContent:"center",
    },
    "modal-container":{
        flex:1,
        alignItems: "center",
        borderRadius:18,
    }
})