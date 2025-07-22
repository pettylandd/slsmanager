import React, { createContext, useContext, useState, ReactNode } from "react";

type Role = "admin" | "editor" | "viewer";

interface AuthContextType {
  user: { name: string; role: Role };
  setUser: (user: { name: string; role: Role }) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Default: viewer (or load from API/localStorage)
  const [user, setUser] = useState<{ name: string; role: Role }>({ name: "Jane", role: "viewer" });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
