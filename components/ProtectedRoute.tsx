// src/components/ProtectedRoute.tsx
import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useAuth } from '../android/app/src/context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../android/app/src/navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { userToken, isLoading } = useAuth();
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  if (!userToken) {
    navigation.replace('Login');
    return null;
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
});

export default ProtectedRoute;