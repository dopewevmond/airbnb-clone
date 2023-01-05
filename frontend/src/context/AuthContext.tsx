import { FC, createContext, useState, ReactNode } from "react";
import { BASE_URL, redirectParamsKey, redirectToKey } from "../utils/constants";
import jwtDecode from "jwt-decode";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { clearUserData, getUserData, setUserData } from "../utils/authHelper";
import axiosInstance from "../utils/axiosInstance";

export interface User {
  id: number | null;
  email: string | null;
  role: string | null;
  accessToken: string | null;
}
interface Props {
  children?: ReactNode;
}
interface IAuthContext extends Omit<User, "accessToken"> {
  isLoggedIn: boolean;
  setLoggedIn: (status: boolean) => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => Promise<void>;
}
const initialAuthContext: IAuthContext = {
  isLoggedIn: Boolean(getUserData()?.accessToken) ?? false,
  id: getUserData()?.id ?? null,
  email: getUserData()?.email ?? null,
  role: getUserData()?.role ?? null,
  setLoggedIn: () => {},
  login: () => Promise.resolve(),
  signup: () => Promise.resolve(),
  logout: () => Promise.resolve(),
};

export const AuthContext = createContext<IAuthContext>(initialAuthContext);

export interface LoginApiResponse {
  accessToken: string;
  refreshToken: string;
}
export interface IDecodedJWT {
  id: number;
  email: string;
  role: string;
  token_id: string;
}

const AuthContextProvider: FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const [id, setId] = useState<number | null>(initialAuthContext.id);
  const [email, setEmail] = useState<string | null>(initialAuthContext.email);
  const [role, setRole] = useState<string | null>(initialAuthContext.role);
  const [isLoggedIn, setLoggedIn] = useState(initialAuthContext.isLoggedIn);
  const location = useLocation();

  const login = async (email: string, password: string): Promise<void> => {
    setEmail(null);
    setRole(null);
    setLoggedIn(false);
    setId(null);
    const { data } = await axios.post<LoginApiResponse>(
      `${BASE_URL}/auth/login`,
      { email, password }
    );
    const jwtInfo = jwtDecode(data.accessToken) as IDecodedJWT;
    setEmail(jwtInfo.email);
    setRole(jwtInfo.role);
    setId(jwtInfo.id);
    setLoggedIn(true);
    setUserData(data.accessToken, data.refreshToken); // storing auth data in localStorage
    let redirectPath = "/";
    const redirect_to = localStorage.getItem(redirectToKey);
    const params = localStorage.getItem(redirectParamsKey);
    if (redirect_to != null) {
      redirectPath = redirect_to;
    }
    if (params != null) {
      redirectPath += params;
    }
    navigate(redirectPath);
  };

  const logout = async () => {
    delete axiosInstance.defaults.headers.common["Authorization"];
    setLoggedIn(false);
    setEmail(null);
    setRole(null);
    setId(null);
    clearUserData(); // removes auth data from localStorage
    navigate("/");
  };

  const signup = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    setEmail(null);
    setRole(null);
    setLoggedIn(false);
    setId(null);
    await axios.post(`${BASE_URL}/auth/signup`, {
      firstName,
      lastName,
      email,
      password,
    });
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        id,
        email,
        role,
        isLoggedIn,
        setLoggedIn,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
