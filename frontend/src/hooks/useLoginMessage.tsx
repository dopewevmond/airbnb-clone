import { useEffect, useState } from "react";
import { loginMessageKey } from "../utils/constants";

export const useLoginMessage = () => {
  const [loginMessage, setLoginMessage] = useState<string | null>(null);

  useEffect(() => {
    const msg = localStorage.getItem(loginMessageKey);
    localStorage.removeItem(loginMessageKey);
    if (msg != null) {
      setLoginMessage(msg);
    }
  }, []);

  return { loginMessage };
};
