import { useState } from "react";
import md5 from "md5";
import { useAuthContext } from "./useAuthContext";
import { apiUrl } from "./config.js";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const usePerfil = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const router = useRouter();

  const atualizarPerfil = async (name, email, password) => {
    setIsLoading(true);
    setError(null);

    const hashedPassword = password ? md5 (password) : null;
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user ? user.token : "";
    const userId = user ? user.id : "";

     console.log(name, email, hashedPassword, token, userId);
      const response = await fetch(`${apiUrl}/users/${userId}`, {
        method: "PUT",
        body: JSON.stringify({ name, email, password: hashedPassword }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await response.json();

      if (response.ok) {
        const atualizarPerfil = { ...user, name, email };
        localStorage.setItem("user", JSON.stringify(atualizarPerfil));
        dispatch({ type: "UPDATE", payload: atualizarPerfil });

        router.push("home");


        // Atualiza os dados do perfil no estado global
       toast.success("Perfil atualizado com sucesso!");

        // Redireciona para a página de perfil ou outra página desejada
      } else {
        setError(json.message);
      }
    } 

  return { atualizarPerfil, isLoading, error };
};
