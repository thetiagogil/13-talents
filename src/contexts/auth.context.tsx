import { createContext, ReactNode, useEffect, useState } from "react";
import { useGetTalents } from "../api/use-talents.api";
import { useGetUserById } from "../api/use-user.api";
import { TalentModel } from "../models/talent.model";
import { UserModel } from "../models/user.model";

type AuthContextProps = {
  isAuthenticated: boolean;
  user: UserModel;
  talents: TalentModel[];
  isLoadingContext: boolean;
  handleLogin: (user: UserModel | undefined) => Promise<void>;
  handleLogout: () => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>(localStorage.getItem("userId") as string);
  const { data: user, isLoading: isLoadingUserData, isError } = useGetUserById(userId);
  const { data: talents = [], isLoading: isLoadingTalentsData } = useGetTalents();

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    } else if (isError) {
      handleLogout();
    }
  }, [user, isError]);

  const handleLogin = async (data: UserModel | undefined) => {
    if (data) {
      window.localStorage.setItem("userId", data.id);
      setUserId(data.id);
      setIsAuthenticated(true);
    }
  };

  const handleLogout = async () => {
    setIsAuthenticated(false);
    setUserId("");
    window.localStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        talents,
        isLoadingContext: isLoadingUserData || isLoadingTalentsData,
        handleLogin,
        handleLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
