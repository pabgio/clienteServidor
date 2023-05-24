import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useRouter } from "next/router";
import md5 from "md5";
import { apiUrl } from "./config.js";
import { toast } from "react-toastify";

export const useLogin = () => {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const router = useRouter();

  const login = async (email, password) => {
    setIsLoading(true);
    setMessage(null);

    const hashedPassword = md5(password);

    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        body: JSON.stringify({ email, password: hashedPassword }),
        headers: { "Content-Type": "application/json" },
      });
      
      const json = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(json));

        dispatch({ type: "LOGIN", payload: json });
        router.push("home");

        toast.success("Login realizado com sucesso"); // Exibe a toast de sucesso
      } else {
        setMessage(json.message);
      }
    } catch (error) {
      setMessage("Erro de conexão com o servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, message };
};
