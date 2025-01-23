import { createContext, ReactNode, useEffect, useState } from "react";
import { getUserByEmail } from "../api/useUserApi";
import { UserModel } from "../models/user.model";

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
    const userLocal = localStorage.getItem("userLocal");
    if (userLocal) {
      const user = JSON.parse(userLocal);
      setUserData(user);
    }
  }, []);

  const setUserData = (user: UserModel) => {
    if (user) {
      setUserId(user.id);
      setIsAuthenticated(true);
      setHasAvatar(user.hasAvatar);
    }
  };

  const handleLogin = async (email: string) => {
    try {
      const user = await getUserByEmail(email);
      if (user) {
        setUserData(user);
        window.localStorage.setItem("userLocal", JSON.stringify(user));
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      return;
    }
  };

  const handleLogout = async () => {
    setUserId(null);
    setIsAuthenticated(false);
    setHasAvatar(false);
    window.localStorage.removeItem("userLocal");
  };

  return (
    <AuthContext.Provider value={{ userId, isAuthenticated, hasAvatar, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
