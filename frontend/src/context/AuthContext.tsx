import { FC, createContext, useState, useEffect, ReactNode } from "react";
import { axiosClient } from "../utils/axiosclient";
import { userInfoKey, refreshTokenKey } from "../utils/constants";
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
  login: (email: string, password: string) => void;
  logout: () => void;
}
const initialAuthContext: IAuthContext = {
  isLoggedIn: false,
  email: null,
  accessToken: null,
  role: null,
  loading: true,
  error: null,
  login: (email: string, password: string) => {},
  logout: () => {}
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
  message? : string
}

const AuthContextProvider: FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
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
    setLoading(false)
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setError(null)
      setLoading(true)

      const data = await axiosClient<LoginApiResponse>(
        "http://127.0.0.1:5000/auth/login",
        { email, password }
      );
      const jwtInfo = jwtDecode(data.accessToken) as IDecodedJWT;

      setEmail(jwtInfo.email);
      setRole(jwtInfo.role);
      setAccessToken(data.accessToken);
      setLoggedIn(true);
      setLoading(false)

      const jsonUserInfo: IUser = {
        isLoggedIn: true,
        email: jwtInfo.email,
        role: jwtInfo.role,
        accessToken: data.accessToken,
      };
      localStorage.setItem(userInfoKey, JSON.stringify(jsonUserInfo));
      localStorage.setItem(refreshTokenKey, JSON.stringify(data.refreshToken))
      navigate('/')
    } catch (err: any) {
      const { response } = err as AxiosError<GenericApiResponse>;
      setError(response?.data?.message ?? 'An error occurred while logging in')
    }
  };

  const logout = async () => {
    try {
      const data = await axiosClient<GenericApiResponse>(
        "http://127.0.0.1:5000/auth/logout",
        {},
        accessToken as string
      );
      console.log(data.message)
      setEmail(null);
      setRole(null);
      setAccessToken(null);
      setLoggedIn(false);
      localStorage.removeItem(userInfoKey)
      localStorage.removeItem(refreshTokenKey)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        email,
        role,
        isLoggedIn,
        accessToken,
        loading,
        login,
        logout,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
