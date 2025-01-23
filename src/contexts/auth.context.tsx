import { createContext, ReactNode, useEffect, useState } from "react";
import { createUserAvatar, getUserByEmail, getUserById } from "../api/useUserApi";
import { UserModel } from "../models/user.model";

type AuthContextProps = {
  userId: string | null;
  isAuthenticated: boolean;
  hasAvatar: boolean;
  handleLogin: (email: string) => Promise<void>;
  handleHasAvatar: () => Promise<void>;
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

  const handleHasAvatar = async () => {
    if (!hasAvatar) {
      await new Promise(res => setTimeout(res, 3000)); // this line is to prolong the loading state for testing purposes
      await createUserAvatar(userId);
      const user = await getUserById(userId);
      if (user) {
        setHasAvatar(user.hasAvatar);
        window.localStorage.setItem("userLocal", JSON.stringify(user));
      }
    }
  };

  const handleLogout = async () => {
    setUserId(null);
    setIsAuthenticated(false);
    setHasAvatar(false);
    window.localStorage.removeItem("userLocal");
  };

  return (
    <AuthContext.Provider value={{ userId, isAuthenticated, hasAvatar, handleLogin, handleHasAvatar, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
