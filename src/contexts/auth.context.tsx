import { createContext, ReactNode, useEffect, useState } from "react";
import { useGetStrengths } from "../api/use-strengths.api";
import { useGetUserById } from "../api/use-user.api";
import { StrengthModel } from "../models/strength.model";
import { UserModel } from "../models/user.model";

type AuthContextProps = {
  isAuthenticated: boolean;
  user: UserModel;
  strengths: StrengthModel[];
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
  const { data: user, isPending: isPendingUserData, isError } = useGetUserById(userId);
  const { data: strengths = [], isPending: isPendingStrengthsData } = useGetStrengths();

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
        strengths,
        isLoadingContext: isPendingUserData || isPendingStrengthsData,
        handleLogin,
        handleLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
