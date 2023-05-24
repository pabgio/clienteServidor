import { useState, useEffect } from "react";
import { useLogin } from "@/hooks/useLogin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error from "@/components/error";
import Home from ".";
import Signup from "./signup";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  
  const [mail, setEmail] = useState("");
  const [password, setSenha] = useState("");
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const { login, message, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(mail, password);
  };

  const handleHomeSemConta = async (e) => {
    e.preventDefault();
    router.push("/homeSemLogin");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    router.push("/signup");
  };

  useEffect(() => {
    if (isLoginSuccess) {
      toast.success("Login realizado com sucesso!", {
        position: toast.POSITION.TOP_CENTER
      });
    } else if (message) {
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER
      });
    }
  }, [isLoginSuccess, message]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-[url(/road.jpg)]">
      <div className="max-w-md w-full p-6 bg-white bg-opacity-70 rounded shadow">
        <h1 className="text-2xl font-semibold mb-4 text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={mail}
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
              className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2"
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors" disabled={isLoading}
          >
            Login
          </button>
        </form>
        
        <button
          onClick={handleHomeSemConta}
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors mt-2" disabled={isLoading}
        >
          Entrar sem conta
        </button>
       
        <button
          onClick={handleSignup}
          className="w-full bg-indigo-500 text-white py-2 px-3 rounded-md hover:bg-indigo-600 transition-colors mt-2" disabled={isLoading} 
        >
          Não tem uma conta? Crie uma agora mesmo!
        </button>
      </div>
    </div>
  );
}
