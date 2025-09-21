import { useState,useEffect } from "react";
import * as jwtDecode from "jwt-decode";

export function useGetUserId() {
  const [token, setToken] = useState(sessionStorage.getItem("token")); 
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.userId); 
      } catch (err) {
        console.error("Invalid token", err);
        setUserId("");
      }
    } else {
      setUserId("");
    }
  }, [token]);

  return userId;
}