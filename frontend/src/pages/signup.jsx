import { useState, useEffect } from "react";
import { useSignup } from "@/hooks/useSignup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error from "@/components/error";

export default function Signup() {
  const [name, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setSenha] = useState("");
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);
  const { signup, message, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Por favor, preencha todos os campos.", {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }

    await signup(name, email, password);
    setIsSignupSuccess(true);
  };

  useEffect(() => {
    if (isSignupSuccess) {
      toast.success("Cadastro realizado com sucesso!", {
        position: toast.POSITION.TOP_CENTER
      });
    } else if (message) {
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER
      });
    }
  }, [isSignupSuccess, message]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-[url(/road.jpg)]">
      <div className="max-w-md w-full p-6 bg-white bg-opacity-70 rounded shadow">
        <h1 className="text-2xl font-semibold mb-4 text-center">Cadastro</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-600">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              value={name}
              placeholder="Digite seu nome"
              className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2"
              onChange={(e) => setNome(e.target.value)}
            />
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Digite seu email"
              className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600">
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Digite sua senha"
              className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2"
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors"
          >
            Cadastrar
          </button>
          {message && <Error erroMensagem={message} className="mt-4" />}
        </form>
        <a href="/" className="mt-4 block text-center text-sm font-medium text-gray-700 hover:underline">
          Voltar
        </a>
        
      </div>
    </div>
  );
}
