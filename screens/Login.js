import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import Button from '../components/Button';
import COLORS from '../constants/Color';
import { useDispatch } from 'react-redux';

const LoginScreen = ({ navigation, route }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async () => {

    try {
      const response = await axios.post('https://a8f2-105-66-133-228.ngrok-free.app/auth/authenticate', {
        username: username,
        password: password,
      });
  
      if (response.status === 200) {
        console.log('Authentication successful', response.data.jwt);
        dispatch({ type: 'SET_TOKEN', payload: response.data.jwt });

        if (route.params && route.params.handleLogin) {
          route.params.handleLogin(response.data.token);
        }
  
        navigation.navigate('HomeScreen');
      } 
    } catch (error) {
      console.error('Authentication failed', error);
      Alert.alert('Login Failed', 'Invalid username or password. Please try again.');
    }
  };
      return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ marginVertical: 22 }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', marginVertical: 12, color: COLORS.black }}>
            Hi Welcome Back! 👋
          </Text>
          <Text style={{ fontSize: 16, color: COLORS.black }}>Hello again, you have been missed!</Text>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: '400', marginVertical: 8 }}>Username</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter your username"
              placeholderTextColor={COLORS.black}
              style={styles.input}
              onChangeText={(text) => setUsername(text)}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: '400', marginVertical: 8 }}>Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor={COLORS.black}
              secureTextEntry={!isPasswordShown}
              style={styles.input}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity onPress={() => setIsPasswordShown(!isPasswordShown)} style={styles.eyeIcon}>
              <Ionicons name={isPasswordShown ? 'eye-off' : 'eye'} size={24} color={COLORS.black} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flexDirection: 'row', marginVertical: 6 }}>
          <Checkbox
            style={{ marginRight: 8 }}
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? COLORS.primary : undefined}
          />
          <Text>Remember Me</Text>
        </View>

        <Button title="Login" filled style={{ marginTop: 18, marginBottom: 4 }} onPress={handleLogin} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={{color: '#AD40AF', fontWeight: '700'}}> Register</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = {
  inputContainer: {
    width: '100%',
    height: 48,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 22,
  },
  input: {
    width: '100%',
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
  },
};

export default LoginScreen;
