import { useEffect } from "react";
import {
  loginMessageKey,
  redirectToKey,
  redirectParamsKey,
} from "../utils/constants";

export const useClearLocalStorage = () => {
  useEffect(() => {
    localStorage.removeItem(loginMessageKey);
    localStorage.removeItem(redirectToKey);
    localStorage.removeItem(redirectParamsKey);
  }, []);
};
