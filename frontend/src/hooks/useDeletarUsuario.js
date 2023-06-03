import { useState } from "react";
import { apiUrl } from "./config.js";

export const useDeletarUsuario = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deletarUsuario = async (userId) => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${apiUrl}/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Deletou o usuário com sucesso
        localStorage.removeItem("user");
        localStorage.removeItem("token");
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
