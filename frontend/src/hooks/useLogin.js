import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useRouter } from "next/router";
import md5 from "md5";
import { apiUrl } from "./config.js";

export const useLogin = () => {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext(); // Updated destructuring

  const router = useRouter(); // Added missing declaration

  const login = async (email, password) => {
    setIsLoading(true);
    setMessage(null);

    const hashSenha = md5(password);

    const response = await fetch(`${apiUrl}/users/login`, {
      method: "post",
      body: JSON.stringify({ email, password: hashSenha }),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setMessage(json.message); // Updated variable name
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      router.push("home");
    } else {
      setIsLoading(false);
      setMessage(json.message); // Updated variable name
    }
  };

  return { login, isLoading, message };
};
