import { refreshTokenKey, userInfoKey } from "./constants";
import { IDecodedJWT, User } from "../context/AuthContext";
import jwtDecode from "jwt-decode";

export const getAccessToken = () => {
  let accessToken = "";
  const userInfo = localStorage.getItem(userInfoKey);
  if (userInfo != null) {
    const jsonUserInfo: User = JSON.parse(userInfo);
    accessToken = jsonUserInfo.accessToken ? jsonUserInfo.accessToken : "";
  }
  return accessToken;
};

export const getRefreshToken = () => {
  let refreshToken = localStorage.getItem(refreshTokenKey);
  if (refreshToken == null) {
    refreshToken = "";
  }
  return refreshToken;
};

/**
 * Serializes and stores user auth information in localStorage
 * @param accessToken  access token obtained after login
 * @param refreshToken refresh token obtained after login
 */
export const setUserData = (accessToken: string, refreshToken: string) => {
  const jwtInfo = jwtDecode(accessToken) as IDecodedJWT;
  const jsonUserInfo: User = {
    id: jwtInfo.id,
    email: jwtInfo.email,
    role: jwtInfo.role,
    accessToken,
  };
  localStorage.setItem(userInfoKey, JSON.stringify(jsonUserInfo));
  localStorage.setItem(refreshTokenKey, refreshToken);
};

export const clearUserData = () => {
  localStorage.removeItem(userInfoKey);
  localStorage.removeItem(refreshTokenKey);
};

/**
 * Gets the user information from localstorage and deserializes into an object
 * @returns an object containing the user infomation or null if user information was not found
 */
export const getUserData = () => {
  const userInfo = localStorage.getItem(userInfoKey);
  let jsonUserInfo: User | null = null;
  if (userInfo != null) {
    jsonUserInfo = JSON.parse(userInfo);
  }
  return jsonUserInfo;
};
