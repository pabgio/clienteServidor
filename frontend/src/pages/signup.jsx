import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Input from "@/components/form/input";
import Button from "@/components/form/button";
import { useSignup } from "@/hooks/useSignup";
import Error from "@/components/error";

export default function Signup() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(nome, email, senha);
  };

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
              className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2"
              onChange={(e) => setNome(e.target.value)}
            />
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2"
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors"
          >
            Login
          </button>
          {error && <Error erroMensagem={error} className="mt-4" />}
        </form>
        <a href="/" className="mt-4 block text-center text-sm font-medium text-gray-700 hover:underline">
          Voltar
        </a>
      </div>
    </div>
  );

}
