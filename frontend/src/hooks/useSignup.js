import { useState } from "react";
import md5 from "md5";
import { useAuthContext } from "./useAuthContext";
import { apiUrl } from "./config.js";
import { useRouter } from "next/router";

export const useSignup = () => {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const router = useRouter();

  const signup = async (name, email, password) => {
    setIsLoading(true);
    setMessage(null);

    const hashedPassword = md5(password);

    try {
      const response = await fetch(`${apiUrl}/users/`, {
        method: "POST",
        body: JSON.stringify({ name, email, password: hashedPassword }),
        headers: { "Content-Type": "application/json" },
      });

      const json = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(json));

        dispatch({ type: "LOGIN", payload: json });
        router.push("login");
      } else {
        setMessage(json.message);
      }
    } catch (error) {
      setMessage("Erro de conexão com o servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, message };
};
