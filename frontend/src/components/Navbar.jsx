import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { IconContext } from "react-icons";
import { FaUser } from "react-icons/fa";
import { useLogout } from "@/hooks/useLogout";

const Navbar = () => {
  const router = useRouter();
  const { logout } = useLogout();
  const {message} = useLogout();

  const handleLogout = async () => {
    await logout(); // Chame a função logout ao fazer logout

    // O redirecionamento para a página de login será tratado internamente no hook useLogout
  };

  return (
    <div>
      <header className="bg-indigo-600 py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-white text-2xl font-bold">SAOITR</h1>
          <nav className="bg-indigo-600">
            <ul className="flex space-x-4">
              <li>
                <Link href="/perfil" className="text-white hover:text-gray-300 flex items-center">
                  <IconContext.Provider value={{ className: "mr-1" }}>
                    <FaUser />
                  </IconContext.Provider>
                  Perfil
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="text-white hover:text-gray-300">
                  Logout
                </button>
                {message && <Error erroMensagem={message} className="mt-4" />}

              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
