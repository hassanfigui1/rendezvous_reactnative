import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Define isAuthenticated state

  const login = (token, user) => {
    setIsLoading(true);
    AsyncStorage.setItem("userToken", token);
    AsyncStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    setUserToken(token);
    setIsAuthenticated(true); // Set isAuthenticated to true after successful login
    setIsLoading(false);
  };

  const logout = () => {
    setIsLoading(true);
    AsyncStorage.removeItem("userToken");
    AsyncStorage.removeItem("user");
    setUser(null);
    setUserToken(null);
    setIsAuthenticated(false); // Set isAuthenticated to false after logout
    setIsLoading(false);
  };

  const isLogging = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem("userToken");
      setUserToken(token);
      const user = await AsyncStorage.getItem("user");
      setUser(JSON.parse(user));
      setIsAuthenticated(!!token); // Set isAuthenticated based on the presence of token
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isLogging();
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, logout, isLoading, userToken, isAuthenticated, user }} // Provide isAuthenticated in the context value
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
