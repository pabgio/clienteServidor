import { useState } from "react";
import md5 from "md5";
import { useAuthContext } from "./useAuthContext";
import { apiUrl } from "./config.js";

import { useRouter } from "next/router";


export const useSignup = () => {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
 

  const router = useRouter();
  // Add setError state

  const signup = async (name, email, password) => {
    setIsLoading(true);
    setMessage(null);

    const hashSenha = md5(password);

    const response = await fetch(`${apiUrl}/users/`, {
      method: "post",
      body: JSON.stringify({ name, email, password: hashSenha }), // Use name instead of nome
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setMessage(json.message);
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      router.push("login");
    }
  };

  return { signup,isLoading, message }; // Include error in the return object
};
