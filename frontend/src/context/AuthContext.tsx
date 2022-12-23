import { FC, createContext, useState, useEffect, ReactNode } from "react";
import { userInfoKey, refreshTokenKey, BASE_URL } from "../utils/constants";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  loading: boolean; // makes the authguard hold on while localstorage is checked for token
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

interface LoginApiResponse {
  accessToken: string;
  refreshToken: string;
}
interface IDecodedJWT {
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
    const userInfo = localStorage.getItem(userInfoKey);
    if (userInfo != null) {
      const jsonUserInfo: IUser = JSON.parse(userInfo);
      setEmail(jsonUserInfo.email);
      setRole(jsonUserInfo.role);
      setAccessToken(jsonUserInfo.accessToken);
      setLoggedIn(true);
    }
    setLoading(false)
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
    const jsonUserInfo: IUser = {
      isLoggedIn: true,
      email: jwtInfo.email,
      role: jwtInfo.role,
      accessToken: data.accessToken,
    };
    localStorage.setItem(userInfoKey, JSON.stringify(jsonUserInfo));
    localStorage.setItem(refreshTokenKey, JSON.stringify(data.refreshToken));

    navigate("/");
  };

  const logout = async () => {
    setEmail(null);
    setRole(null);
    setLoggedIn(false);
    localStorage.removeItem(userInfoKey);
    localStorage.removeItem(refreshTokenKey);
    await axios.post(`${BASE_URL}/auth/logout`, null, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
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
