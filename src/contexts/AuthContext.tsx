import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService } from '../services/api.service';

// Define roles
type Role = "admin" | "editor" | "viewer" | "";

// Authentication context interface
interface AuthContextType {
  apiKey: string | null;
  user: { username: string; role: Role } | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean; // return success for demo
  logout: () => void;
  setApiKey: (key: string) => void;
  clearApiKey: () => void;
}

// Demo users (for demo only, do NOT use in prod)
const DEMO_USERS: Record<string, { password: string; role: Role, apiKey: string }> = {
  admin: { password: "admin123", role: "admin", apiKey: "admin-key" },
  viewer: { password: "viewer123", role: "viewer", apiKey: "viewer-key" },
  editor: { password: "editor123", role: "editor", apiKey: "editor-key" },
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [apiKey, setApiKeyState] = useState<string | null>(null);
  const [user, setUser] = useState<{ username: string; role: Role } | null>(null);

  // Load API key & user from localStorage on mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem('srt-api-key');
    const savedUser = localStorage.getItem('srt-user');
    if (savedApiKey) {
      setApiKeyState(savedApiKey);
      apiService.setApiKey(savedApiKey);
    }
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Set API key and save to localStorage
  const setApiKey = (key: string) => {
    setApiKeyState(key);
    apiService.setApiKey(key);
    localStorage.setItem('srt-api-key', key);
  };

  // Login function (demo: check DEMO_USERS)
  const login = (username: string, password: string) => {
    const found = DEMO_USERS[username];
    if (found && found.password === password) {
      setUser({ username, role: found.role });
      setApiKey(found.apiKey);
      localStorage.setItem('srt-user', JSON.stringify({ username, role: found.role }));
      return true;
    }
    return false;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    clearApiKey();
    localStorage.removeItem('srt-user');
  };

  // Clear API key
  const clearApiKey = () => {
    setApiKeyState(null);
    apiService.setApiKey('');
    localStorage.removeItem('srt-api-key');
  };

  return (
    <AuthContext.Provider
      value={{
        apiKey,
        user,
        isAuthenticated: !!apiKey && !!user,
        login,
        logout,
        setApiKey,
        clearApiKey,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 
