import { useEffect, useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar.jsx";

const Perfil = () => {
  const [user, setUser] = useState(null);
  const { state } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } else {
      router.push("/login");
    }
  }, []);

  if (!user) {
    return null;
  }
  const handleAlteraPerfil = async (e) => {
    e.preventDefault();
    router.push("/alteraPerfil");
  };

  return (
    <div>
      <Navbar />
      <div className="mt-0 min-h-screen flex  justify-center bg-gray-100">
        <div className="mt-10 max-w-md w-full max-h-[300px] p-6 bg-white bg-opacity-70 rounded shadow">
          <h1 className="text-2xl font-semibold mb-4 text-center">Perfil</h1>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-600">
              Nome
            </label>
            <input
              type="text"
              id="name"
              value={user.name}
              readOnly
              className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2 bg-gray-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={user.email}
              readOnly
              className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2 bg-gray-50"
            />
          </div>
          <button
            onClick={handleAlteraPerfil}
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors"
          >
            Editar Perfil
          </button>
        </div>
      </div>
    </div>
  );
};

export default Perfil;