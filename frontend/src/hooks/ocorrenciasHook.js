import { useState } from "react";
import { apiUrl } from "./config.js";
import { useAuthContext } from "./useAuthContext";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useOcorrencias = () => {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuthContext();
  const router = useRouter();
  const [ocorrencia, setOcorrencia] = useState([]);

  const cadastrarOcorrencia = async (ocorrenciaData) => {
    setIsLoading(true);
    setMessage(null);

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id;
      const token = user?.token;

      const response = await fetch(`${apiUrl}/occurrences`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({ ...ocorrenciaData, user_id: userId }),

      });

      const data = await response.json();

      if (response.ok) {
        // Sucesso no cadastro da ocorrência
        router.push("/home");
        toast.success("Ocorrência cadastrada com sucesso");
      } else {
        // Ocorreu um erro no cadastro da ocorrência
        setMessage(data.message);
      }
    } catch (error) {
      // Ocorreu um erro de conexão com o servidor
      toast.error("Erro de conexão com o servidor.");
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
  const listarOcorrenciaUser = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.token : "";
  const id = user ? user.id : "";

  const response = await fetch(`${apiUrl}/occurrences/users/${id}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await response.json();

  return json;
};

const editarOcorrencia = async (ocorrenciaId, ocorrenciaData) => {
  setIsLoading(true);
  setMessage(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.token : "";
  const user_id = user ? user.id : "";
  const dataOc = { ...ocorrenciaData, user_id: user_id };

  try {
    const response = await fetch(`${apiUrl}/occurrences/${ocorrenciaId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataOc),
    });

    const data = await response.json();

    if (response.ok) {
      // Sucesso na edição da ocorrência
      // Faça algo em resposta à edição bem-sucedida
      router.push("home");

      toast.success("Ocorrência editada com sucesso");

    } else {
      // Ocorreu um erro na edição da ocorrência
      setMessage(data.message);
    }
  } catch (error) {
    // Ocorreu um erro de conexão com o servidor
    setMessage("Erro de conexão com o servidor.");
  } finally {
    setIsLoading(false);
  }
};

const deletarOcorrencia = async (ocorrenciaId) => {
  setIsLoading(true);
  setMessage(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.token : "";

  try {
    const response = await fetch(`${apiUrl}/occurrences/${ocorrenciaId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      // Sucesso na exclusão da ocorrência
      // Faça algo em resposta à exclusão bem-sucedida
      toast.success("Ocorrência excluída com sucesso");
      router.push("home");
    } else {
      // Ocorreu um erro na exclusão da ocorrência
      const data = await response.json();
      setMessage(data.message);
    }
  } catch (error) {
    // Ocorreu um erro de conexão com o servidor
    setMessage("Erro de conexão com o servidor.");
  } finally {
    setIsLoading(false);
  }
};

return {
  cadastrarOcorrencia,
  listarOcorrencias,
  listarOcorrenciaUser,
  editarOcorrencia, 
  deletarOcorrencia, 
  message,
  isLoading,
};
};