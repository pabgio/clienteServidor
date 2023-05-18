import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Input from "@/components/form/input";
import Button from "@/components/form/button";
import { useLogin } from "@/hooks/useLogin";
import Error from "@/components/error";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, senha);
  };

  // return (
  //   <div className="bg-gray-800 min-h-screen flex items-center justify-center">
  //     <div className="card bg-white shadow-lg max-w-md md:w-[100%] w-full max-h-[90vh]">
  //       <div className="relative h-72">
  //         <Image
  //           src="/road2.jpg"
  //           alt="rua"
  //           width={500}
  //           height={500}
  //           priority
  //         />
  //       </div>

  //       <div className="p-8">
  //         <h3 className="text-3xl md:text-4xl font-bold mb-4 text-center text-white">
  //           <span className="text-cyan-500">ReporT</span>rânsito
  //         </h3>

  //         <form className="space-y-4" onSubmit={handleSubmit}>
  //           <Input
  //             tipo="email"
  //             texto="Email"
  //             placeholder="Digite seu email"
  //             name="email"
  //             value={email}
  //             onChange={(e) => setEmail(e.target.value)}
  //           />

  //           <Input
  //             tipo="password"
  //             texto="Senha"
  //             placeholder="Digite sua senha"
  //             name="senha"
  //             value={senha}
  //             onChange={(e) => setSenha(e.target.value)}
  //           />

  //           <Button tipo="submit" texto="Login" disabled={isLoading} />
  //           {error && <Error erroMensagem={error} />}
  //         </form>

  //         <div className="flex mt-6">
  //           <Link href="/signup" className="group ripple btn w-1/2 text-base flex items-center justify-center">

  //               Criar Conta
  //               <FontAwesomeIcon
  //                 icon={faArrowRight}
  //                 className="ml-2 group-hover:translate-x-1 transition duration-300"
  //               />

  //           </Link>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );


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
        <a href="/signup" className="mt-4 block text-center text-sm font-medium text-gray-700 hover:underline">
          Não tem uma conta? Crie uma agora mesmo!
        </a>
      </div>
    </div>
  );
}
