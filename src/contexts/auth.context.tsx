import { createContext, ReactNode, useEffect, useState } from "react";
import { getUserByEmail, getUserById, updateUserAvatarState } from "../api/useUserApi";
import { UserModel } from "../models/user.model";

type AuthContextProps = {
  isAuthenticated: boolean;
  user: UserModel | null;
  isLoadingUserData: boolean;
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
  const [user, setUser] = useState<UserModel | null>(null);
  const [isLoadingUserData, setIsLoadingUserData] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        try {
          const user = await getUserById(storedUserId);
          setUser(user);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Failed to get user:", error);
          handleLogout();
        }
      }
      setIsLoadingUserData(false);
    };

    loadUser();
  }, []);

  const handleLogin = async (email: string) => {
    try {
      const user = await getUserByEmail(email);
      if (user) {
        window.localStorage.setItem("userId", user.id);
        setUser(user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleHasAvatar = async () => {
    if (user && !user.hasAvatar) {
      try {
        await new Promise(res => setTimeout(res, 3000)); // this line is to prolong the loading state for testing purposes
        const updatedUser = await updateUserAvatarState(user.id);
        if (updatedUser) {
          setUser(updatedUser);
        }
      } catch (error) {
        console.error("Failed to create avatar:", error);
      }
    }
  };

  const handleLogout = async () => {
    setIsAuthenticated(false);
    setUser(null);
    window.localStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        isLoadingUserData,
        handleLogin,
        handleHasAvatar,
        handleLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
