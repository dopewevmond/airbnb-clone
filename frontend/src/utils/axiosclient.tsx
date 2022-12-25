import axios, { AxiosError } from "axios";
import jwtDecode from "jwt-decode";
import { LoginApiResponse } from "../context/AuthContext";
import { BASE_URL } from "./constants";
import { getAccessToken, getRefreshToken, setUserData } from "./authHelper";

let accessToken = getAccessToken();

const axiosAuthInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

axiosAuthInstance.interceptors.request.use(async (config) => {
  // before every request we check if the access token is expired
  // if it has, we use the refresh token to get a new access-refresh token pair, ...
  // ... store them in localstorage, and use the new access token for the request
  const exp = jwtDecode<{ exp: number }>(accessToken).exp;
  if (exp < new Date().getTime() / 1000) {
    console.log("refreshing token before request...");
    const refreshToken = getRefreshToken();
    const { data } = await axios.post<LoginApiResponse>(
      `${BASE_URL}/auth/refresh-token`,
      {
        token: refreshToken,
      }
    );
    setUserData(data.accessToken, data.refreshToken);
    if (config.headers != null) {
      config.headers.Authorization = `Bearer ${data.accessToken}`;
    }
    accessToken = data.accessToken;
  }
  return config;
}, (err: any) => {
  const error = err as AxiosError<{ message?: string }>
  return Promise.reject(error)
});

export default axiosAuthInstance;
