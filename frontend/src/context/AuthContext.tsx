import { FC, createContext, useState, useEffect, ReactNode } from "react";
import { BASE_URL } from "../utils/constants";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { clearUserData, getUserData, setUserData } from "../utils/authHelper";

export interface IUser {
  email: string | null;
  role: string | null;
  accessToken: string | null;
}
interface Props {
  children?: ReactNode;
}
interface IAuthContext extends IUser {
  isLoggedIn: boolean;
  loading: boolean; // makes the authguard hold on while localstorage is checked for token
  setAccessToken: (accessToken: string) => void;
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
  loading: true,
  isLoggedIn: false,
  email: null,
  accessToken: null,
  role: null,
  setAccessToken: () => {},
  login: (email: string, password: string) => Promise.resolve(),
  signup: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise.resolve(),
  logout: () => Promise.resolve(),
};

export const AuthContext = createContext<IAuthContext>(initialAuthContext);

export interface LoginApiResponse {
  accessToken: string;
  refreshToken: string;
}
export interface IDecodedJWT {
  email: string;
  role: string;
  token_id: string;
}

const AuthContextProvider: FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const userInfo = getUserData();
    if (userInfo != null) {
      setEmail(userInfo.email);
      setRole(userInfo.role);
      setAccessToken(userInfo.accessToken);
      setLoggedIn(true);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setEmail(null);
    setRole(null);
    setAccessToken(null);
    setLoggedIn(false);
    const { data } = await axios.post<LoginApiResponse>(
      `${BASE_URL}/auth/login`,
      { email, password }
    );
    const jwtInfo = jwtDecode(data.accessToken) as IDecodedJWT;
    setEmail(jwtInfo.email);
    setRole(jwtInfo.role);
    setAccessToken(data.accessToken);
    setLoggedIn(true);
    setUserData(data.accessToken, data.refreshToken); // storing auth data in localStorage
    navigate("/");
  };

  const axiosLogout = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  axiosLogout.interceptors.response.use(
    (response) => {
      return Promise.resolve(response);
    },
    async (error) => {
      const { response } = error as AxiosError<{ message?: string }>;
      if (response?.data.message === ("jwt expired" || "unauthorized")) {
        return Promise.reject({ message: "User already logged out" });
      }
      return Promise.reject(error);
    }
  );

  const logout = async () => {
    setLoggedIn(false);
    clearUserData(); // removes auth data from localStorage
    await axiosLogout({ method: "POST", url: "/auth/logout" });
  };

  const signup = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    setEmail(null);
    setRole(null);
    setAccessToken(null);
    setLoggedIn(false);
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
        loading,
        email,
        role,
        isLoggedIn,
        accessToken,
        setAccessToken,
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
