import { useState } from "react";
import { apiUrl } from "./config.js";
import { useAuthContext } from "./useAuthContext";
import { useRouter } from "next/router";

export const useOcorrencias = () => {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuthContext();
  const router = useRouter();

  const cadastrarOcorrencia = async (ocorrenciaData) => {
    setIsLoading(true);
    setMessage(null);
    

    try {
        const user = JSON.parse(localStorage.getItem("user"));
    
    const userId = user?.id;
      const response = await fetch(`${apiUrl}/occurences`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(ocorrenciaData, userId ),
      });

      const data = await response.json();

      if (response.ok) {
        // Sucesso no cadastro da ocorrência
        router.push("/ocorrencias");
      } else {
        // Ocorreu um erro no cadastro da ocorrência
        setMessage(data.message);
      }
    } catch (error) {
      // Ocorreu um erro de conexão com o servidor
      setMessage("Erro de conexão com o servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  const listarOcorrencias = async () => {
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch(`${apiUrl}/ocorrencias`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        // Sucesso na obtenção das ocorrências
        // Faça algo com os dados retornados (ex: atualizar estado, exibir na tela, etc.)
      } else {
        // Ocorreu um erro na obtenção das ocorrências
        setMessage(data.message);
      }
    } catch (error) {
      // Ocorreu um erro de conexão com o servidor
      setMessage("Erro de conexão com o servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  const visualizarOcorrencia = async (ocorrenciaId) => {
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch(`${apiUrl}/ocorrencias/${ocorrenciaId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        // Sucesso na obtenção da ocorrência
        // Faça algo com os dados retornados (ex: atualizar estado, exibir na tela, etc.)
      } else {
        // Ocorreu um erro na obtenção da ocorrência
        setMessage(data.message);
      }
    } catch (error) {
      // Ocorreu um erro de conexão com o servidor
      setMessage("Erro de conexão com o servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  // Outras funções relacionadas a ocorrências (ex: atualizar ocorrência, excluir ocorrência, etc.)

  return {
    cadastrarOcorrencia,
    listarOcorrencias,
    visualizarOcorrencia,
    isLoading,
    message,
  };
};
