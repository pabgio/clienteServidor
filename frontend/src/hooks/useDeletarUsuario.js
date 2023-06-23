import { useState } from "react";
import { useRouter } from "next/router";

import { apiUrl } from "./config.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useDeletarUsuario = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const deletarUsuario = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const token = user ? user.token : "";
      const userId = user ? user.id : user

      const response = await fetch(`${apiUrl}/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Deletou o usuário com sucesso
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        router.push("/login");
        toast.success("Usuário deletado com sucesso!");
      } else {
        const json = await response.json();
        setError(json.message);
      }
    } catch (error) {
      setError("Erro de conexão com o servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return { deletarUsuario, isLoading, error };
};
