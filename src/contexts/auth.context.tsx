import { createContext, ReactNode, useEffect, useState } from "react";
import { createUserAvatar, getUserByEmail, getUserById } from "../api/useUserApi";
import { UserModel } from "../models/user.model";

type AuthContextProps = {
  isAuthenticated: boolean;
  userId: string | null;
  userName: string | null;
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [hasAvatar, setHasAvatar] = useState<boolean>(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
          const user = await getUserById(storedUserId);
          setUserData(user);
        }
      } catch (error) {
        console.error("Failed to get user:", error);
        handleLogout();
      }
    };

    loadUser();
  }, []);

  const setUserData = (user?: UserModel) => {
    if (user) {
      setUserId(user.id);
      setUserName(user.name);
      setHasAvatar(user.hasAvatar);
      setIsAuthenticated(true);
    }
  };

  const handleLogin = async (email: string) => {
    try {
      const user = await getUserByEmail(email);
      if (user) {
        window.localStorage.setItem("userId", user.id);
        setUserData(user);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleHasAvatar = async () => {
    if (!hasAvatar) {
      try {
        await new Promise(res => setTimeout(res, 3000)); // this line is to prolong the loading state for testing purposes
        await createUserAvatar(userId);

        const updatedUser = await getUserById(userId);
        if (updatedUser) {
          setHasAvatar(updatedUser.hasAvatar);
        }
      } catch (error) {
        console.error("Failed to create avatar:", error);
      }
    }
  };

  const handleLogout = async () => {
    setIsAuthenticated(false);
    setUserId(null);
    setUserName(null);
    setHasAvatar(false);
    window.localStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userId, userName, hasAvatar, handleLogin, handleHasAvatar, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
