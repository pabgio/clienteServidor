import { useAuthContext } from "./useAuthContext";
import { useRouter } from "next/router";
import { apiUrl } from "./config";
import { useState } from "react";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const router = useRouter();
  const [message, setMessage] = useState(null);

  const logout = async () => {
    setMessage(null);

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;
      const userId = user?.id;

      if (token) {
        const response = await fetch(`${apiUrl}/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId }), // Enviar o userId no corpo da requisição
        });

        const json = await response.json();
        setMessage(json.message);
      }
    } catch (error) {
      setMessage("Erro ao efetuar logout");
    }

    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    router.push("/login");
  };

  return { logout, message };
};
