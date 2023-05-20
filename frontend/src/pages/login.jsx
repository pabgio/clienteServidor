import { useState } from "react";;
import { useLogin } from "@/hooks/useLogin";
import Error from "@/components/error";

export default function Login() {
  
  const [mail, setEmail] = useState("");
  const [password, setSenha] = useState("");
  const { login, message, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(mail, password);
  };

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
          {message && <Error erroMensagem={message} className="mt-4" />}
        </form>
        <a href="/signup" className="mt-4 block text-center text-sm font-medium text-gray-700 hover:underline">
          Não tem uma conta? Crie uma agora mesmo!
        </a>
      </div>
    </div>
  );
}
