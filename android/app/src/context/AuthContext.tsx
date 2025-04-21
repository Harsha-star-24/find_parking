// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { StackNavigationProp } from '@react-navigation/stack';

type AuthContextData = {
  userToken: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  userData: UserData | null;
};

type UserData = {
  id: string;
  name: string;
  email: string;
  // Add other user properties as needed
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('parkingAppToken');
      const userDataString = await AsyncStorage.getItem('userData');
      
      if (token && userDataString) {
        setUserToken(token);
        setUserData(JSON.parse(userDataString));
      }
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      const response = await new Promise((resolve) =>
        setTimeout(() => {
          resolve({ token: 'dummy_token', userData: { id: '1', name: 'John Doe', email } });
        }, 1500)
      );

      const { token, userData } = response as { token: string; userData: UserData };
      
      await AsyncStorage.setItem('parkingAppToken', token);
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      setUserToken(token);
      setUserData(userData);

      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabs' }],
      });
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Failed', 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem('parkingAppToken');
      await AsyncStorage.removeItem('userData');
      setUserToken(null);
      setUserData(null);
      navigation.replace("Login");
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue: AuthContextData = {
    userToken,
    isLoading,
    login,
    logout,
    userData,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
