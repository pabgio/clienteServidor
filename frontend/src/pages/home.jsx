import { useRouter } from "next/router";
import { IconContext } from "react-icons";
import { FaUser } from "react-icons/fa";
import { useAuthentication } from "../components/auth.js";
import Navbar from "../components/Navbar.jsx";
import { useOcorrencias } from "../hooks/ocorrenciasHook.js";




const HomePage = () => {
  const { cadastrarOcorrencia } = useOcorrencias();
  const router = useRouter();

  const handleCadastroOcorrencia = () => {
    // Redireciona para a página de cadastro de ocorrência
    router.push("/cadastroOcorrencia");
  };

  const handleVisualizarOcorrencias = () => {
    // Redireciona para a página de listagem de ocorrências
    router.push("/ocorrencias");
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8">
      
        <div className="flex justify-center mt-8">
          <button
            onClick={handleCadastroOcorrencia}
            className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md mr-4"
          >
            Cadastrar Ocorrência
          </button>
          <button
            onClick={handleVisualizarOcorrencias}
            className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md"
          >
            Visualizar Ocorrências
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
