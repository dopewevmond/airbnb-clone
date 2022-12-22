import { FC, createContext, useState, useEffect, ReactNode } from "react";
import { axiosClient } from "../utils/axiosclient";
import { userInfoKey, refreshTokenKey, BASE_URL } from "../utils/constants";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

export interface IUser {
  isLoggedIn: boolean;
  email: string | null;
  role: string | null;
  accessToken: string | null;
}
interface Props {
  children?: ReactNode;
}
interface IAuthContext extends IUser {
  loading: boolean;
  error: string | null;
  displayMessage: string | null;
  login: (email: string, password: string) => void;
  signup: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => void;
  logout: () => void;
}
const initialAuthContext: IAuthContext = {
  isLoggedIn: false,
  displayMessage: null,
  email: null,
  accessToken: null,
  role: null,
  loading: true,
  error: null,
  login: (email: string, password: string) => {},
  signup: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {},
  logout: () => {},
};

export const AuthContext = createContext<IAuthContext>(initialAuthContext);

interface LoginApiResponse {
  accessToken: string;
  refreshToken: string;
}
interface IDecodedJWT {
  email: string;
  role: string;
  token_id: string;
}
interface GenericApiResponse {
  message?: string;
}

const AuthContextProvider: FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [displayMessage, setDisplayMessage] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  useEffect(() => {
    const userInfo = localStorage.getItem(userInfoKey);
    if (userInfo != null) {
      const jsonUserInfo: IUser = JSON.parse(userInfo);
      setEmail(jsonUserInfo.email);
      setRole(jsonUserInfo.role);
      setAccessToken(jsonUserInfo.accessToken);
      setLoggedIn(true);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);
    setDisplayMessage(null);
    setEmail(null);
    setRole(null);
    setAccessToken(null);
    setLoggedIn(false);
    try {
      const data = await axiosClient<LoginApiResponse>(
        `${BASE_URL}/auth/login`,
        { email, password }
      );
      const jwtInfo = jwtDecode(data.accessToken) as IDecodedJWT;
      setEmail(jwtInfo.email);
      setRole(jwtInfo.role);
      setAccessToken(data.accessToken);
      setLoggedIn(true);

      const jsonUserInfo: IUser = {
        isLoggedIn: true,
        email: jwtInfo.email,
        role: jwtInfo.role,
        accessToken: data.accessToken,
      };
      localStorage.setItem(userInfoKey, JSON.stringify(jsonUserInfo));
      localStorage.setItem(refreshTokenKey, JSON.stringify(data.refreshToken));
      setLoading(false);
      navigate("/");
    } catch (err: any) {
      const { response } = err as AxiosError<GenericApiResponse>;
      setError(response?.data?.message ?? "An error occurred while logging in");
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    setDisplayMessage(null);
    setEmail(null);
    setRole(null);
    setLoggedIn(false);
    try {
      await axiosClient<GenericApiResponse>(
        `${BASE_URL}/auth/logout`,
        {},
        accessToken as string
      );
      localStorage.removeItem(userInfoKey);
      localStorage.removeItem(refreshTokenKey);
      setLoading(false);
    } catch (err) {
      const { response } = err as AxiosError<GenericApiResponse>;
      setLoading(false);
      if (response?.data.message !== "unauthorized") {
        setError(
          response?.data?.message ?? "An error occurred while logging out"
        );
      }
    }
  };

  const signup = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    setLoading(true);
    setError(null);
    setDisplayMessage(null);
    setEmail(null);
    setRole(null);
    setAccessToken(null);
    setLoggedIn(false);
    try {
      const data = await axiosClient<GenericApiResponse>(
        `${BASE_URL}/auth/signup`,
        { firstName, lastName, email, password }
      );
      setLoading(false);
      setDisplayMessage(data.message ?? "The user was created successfully");
      navigate("/login");
    } catch (err: any) {
      const { response } = err as AxiosError<GenericApiResponse>;
      setLoading(false);
      setError(response?.data?.message ?? "An error occurred while signing up");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        email,
        role,
        isLoggedIn,
        accessToken,
        loading,
        displayMessage,
        login,
        signup,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
