import { createContext, ReactNode, useEffect, useState } from "react";
import { getUserByEmail } from "../api/useUserApi";

type AuthContextProps = {
  userId: string | null;
  isAuthenticated: boolean;
  hasAvatar: boolean;
  handleLogin: (email: string) => Promise<void>;
  handleLogout: () => Promise<void>;
};

type AuthContextProvider = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthContextProvider = ({ children }: AuthContextProvider) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [hasAvatar, setHasAvatar] = useState<boolean>(false);

  useEffect(() => {
    const userId = window.localStorage.getItem("userId");
    if (userId) {
      setUserId(userId);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (email: string) => {
    try {
      const user = await getUserByEmail(email);
      if (user) {
        setUserId(user.id);
        setHasAvatar(user.hasAvatar);
        window.localStorage.setItem("userId", user.id);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    setIsAuthenticated(false);
    setUserId(null);
    setHasAvatar(false);
    window.localStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider value={{ userId, isAuthenticated, hasAvatar, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
