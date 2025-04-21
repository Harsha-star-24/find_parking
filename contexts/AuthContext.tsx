import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../types/types';

interface AuthContextData {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({
  user: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    // TODO: replace with real API call
    const fakeUser: User = {
      id: '1',
      name: 'John Doe',
      email,
      vehicles: [],
      favoriteZones: [],
    };
    setUser(fakeUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}