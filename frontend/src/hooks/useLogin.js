import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useRouter } from "next/router";

export const useLogin = () => {
  const [error, setErro] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const router = useRouter();

  const login = async (email, senha) => {
    setIsLoading(true);
    setErro(null);

    const response = await fetch("http://localhost:23000/users/login", {
      method: "post",
      body: JSON.stringify({ email, senha }),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setErro(json.error);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      router.push("home");
    }
  };

  return { login, isLoading, error };
};
