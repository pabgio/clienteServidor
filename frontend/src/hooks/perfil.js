import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useRouter } from "next/router";
import { apiUrl } from "./config.js";

export const usePerfil = () => {
    const [error, setErro] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();
    const router = useRouter();
    
    const perfil = async (email, senha) => {
        setIsLoading(true);
        setErro(null);
    
        const response = await fetch(`${apiUrl}/users/${id}`, {
        method: "get",
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
    
        dispatch({ type: "PERFIL", payload: json });
        setIsLoading(false);
        }
        else {
        setIsLoading(false);
        setErro(json.error);
        }
    };
    
    return { perfil, isLoading, error };
    }