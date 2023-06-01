import { useState } from "react";
import md5 from "md5";
import { useAuthContext } from "./useAuthContext";
import { apiUrl } from "./config.js";
import { useRouter } from "next/router";

export const usePerfil = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();
    const router = useRouter();

    const atualizarPerfil = async (profileData) => {
        setIsLoading(true);
        setError(null);

        try {
            const { email, password, novaSenha } = profileData;
            const user = JSON.parse(localStorage.getItem("user"));
            const token = user?.token;
            const userId = user?.id;

            let updatedProfileData = { email };

            if (password && novaSenha) {
                // Se a senha atual e a nova senha foram fornecidas, criptografa a nova senha
                const hashedSenha = md5(novaSenha);
                updatedProfileData = { ...updatedProfileData, novaSenha: hashedSenha };
            }

            const response = await fetch(`${apiUrl}/users/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedProfileData),
            });

            const json = await response.json();

            if (response.ok) {
                if (json.token) {
                    // Se um novo token foi retornado, atualiza o token armazenado
                    localStorage.setItem("token", json.token);
                }

                // Atualiza os dados do perfil no estado global
                dispatch({ type: "PERFIL", payload: { email } });

                // Redireciona para a página de perfil ou outra página desejada
                router.push("/home");
            } else {
                setError(json.message);
            }
        } catch (error) {
            setError("Erro de conexão com o servidor.");
        } finally {
            setIsLoading(false);
        }
    };

    return { atualizarPerfil, isLoading, error };
};
