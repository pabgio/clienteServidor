import { useEffect, useState } from "react";
import { useOcorrencias } from "../hooks/ocorrenciasHook.js";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar.jsx";

const CadastroOcorrencia = () => {
  const [ocurrence_type, setOcurrence_type] = useState("");
  const [registered_at, setRegistered_at] = useState("");
  const [km, setKm] = useState("");
  const [local, setLocal] = useState("");
  const { cadastrarOcorrencia, message } = useOcorrencias();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ocurrence_type || !registered_at || !km || !local) {
      toast.error("Por favor, preencha todos os campos.", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    const ocorrenciaData = {
      ocurrence_type,
      registered_at,
      km,
      local
    };

    const response = await cadastrarOcorrencia(ocorrenciaData);
    
    if (response === 200) {
      toast.success("Cadastro realizado com sucesso!", {
        position: toast.POSITION.TOP_CENTER,
      });
      router.push("/");
    } else {
      toast.error("Erro ao cadastrar ocorrência.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  useEffect(() => {
    if (message) {
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [message]);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Cadastro de Ocorrência</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="ocurrence_type">
              Tipo de Ocorrência
            </label>
            <input
              className="border border-gray-400 rounded-md p-2 w-full"
              type="text"
              id="ocurrence_type"
              name="ocurrence_type"
              value={ocurrence_type}
              onChange={(e) => setOcurrence_type(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="registered_at">
              Data de Registro
            </label>
            <input
              className="border border-gray-400 rounded-md p-2 w-full"
              type="date"
              id="registered_at"
              name="registered_at"
              value={registered_at}
              onChange={(e) => setRegistered_at(e.target.value)}
              max={new Date().toISOString().split("T")[0]} // Define a data máxima como a data atual para evitar datas futuras
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="km">
              Km
            </label>
            <input
              className="border border-gray-400 rounded-md p-2 w-full"
              type="text"
              id="km"
              name="km"
              value={km}
              onChange={(e) => setKm(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="local">
              Local
            </label>
            <input
              className="border border-gray-400 rounded-md p-2 w-full"
              type="text"
              id="local"
              name="local"
              value={local}
              onChange={(e) => setLocal(e.target.value)}
            />
          </div>
          <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md"
            type="submit"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CadastroOcorrencia;
