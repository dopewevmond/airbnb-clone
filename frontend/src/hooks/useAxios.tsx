import { useContext } from "react";
import axios, { AxiosError } from "axios";
import jwtDecode from "jwt-decode";
import { AuthContext, LoginApiResponse } from "../context/AuthContext";
import { BASE_URL } from "../utils/constants";
import { getRefreshToken, setUserData } from "../utils/authHelper";

const useAxios = () => {
  const { accessToken, setAccessToken, logout } = useContext(AuthContext);

  const axiosAuthInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  axiosAuthInstance.interceptors.request.use(
    async (config) => {
      const tokenString = accessToken as string;
      const exp = jwtDecode<{ exp: number }>(tokenString).exp;
      if (exp < new Date().getTime() / 1000) {
        console.log("refreshing token before request...");
        const refreshToken = getRefreshToken();
        const { data } = await axios.post<LoginApiResponse>(
          `${BASE_URL}/auth/refresh-token`,
          {
            token: refreshToken,
          }
        );
        if (config.headers != null) {
          config.headers.Authorization = `Bearer ${data.accessToken}`;
        }
        setAccessToken(data.accessToken);
        setUserData(data.accessToken, data.refreshToken);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // automatically logging users out when the refresh token is expired or invalid
  axiosAuthInstance.interceptors.response.use(
    (response) => {
      return Promise.resolve(response);
    },
    async (error) => {
      console.log(error);
      const { response } = error as AxiosError<{ message?: string }>;
      if (
        response?.data.message === "jwt expired" ||
        response?.data.message === "invalid refresh token"
      ) {
        await logout();
      }
      return Promise.reject(error);
    }
  );

  return { axiosAuthInstance };
};

export default useAxios;
