import { FC, createContext, useState, ReactNode } from "react";
import { BASE_URL } from "../utils/constants";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { clearUserData, getUserData, setUserData } from "../utils/authHelper";

export interface User {
  id: number | null;
  email: string | null;
  role: string | null;
  accessToken: string | null;
}
interface Props {
  children?: ReactNode;
}
interface IAuthContext extends User {
  isLoggedIn: boolean;
  // loading: boolean; // makes the authguard hold on while localstorage is checked for token
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
  isLoggedIn: Boolean(getUserData()?.accessToken) ?? false,
  id: getUserData()?.id ?? null,
  email: getUserData()?.email ?? null,
  accessToken: getUserData()?.accessToken ?? null,
  role: getUserData()?.role ?? null,
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
  id: number,
  email: string;
  role: string;
  token_id: string;
}

const AuthContextProvider: FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const [id, setId] = useState<number|null>(initialAuthContext.id)
  const [email, setEmail] = useState<string | null>(initialAuthContext.email);
  const [role, setRole] = useState<string | null>(initialAuthContext.role);
  const [isLoggedIn, setLoggedIn] = useState(initialAuthContext.isLoggedIn);
  const [accessToken, setAccessToken] = useState<string | null>(initialAuthContext.accessToken);

  const login = async (email: string, password: string): Promise<void> => {
    setEmail(null);
    setRole(null);
    setAccessToken(null);
    setLoggedIn(false);
    setId(null)
    const { data } = await axios.post<LoginApiResponse>(
      `${BASE_URL}/auth/login`,
      { email, password }
    );
    const jwtInfo = jwtDecode(data.accessToken) as IDecodedJWT;
    setEmail(jwtInfo.email);
    setRole(jwtInfo.role);
    setId(jwtInfo.id)
    setAccessToken(data.accessToken);
    setLoggedIn(true);
    setUserData(data.accessToken, data.refreshToken); // storing auth data in localStorage
    if (jwtInfo.role === "host") {
      navigate("/hosting");
    } else {
      navigate("/");
    }
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
    setId(null)
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
