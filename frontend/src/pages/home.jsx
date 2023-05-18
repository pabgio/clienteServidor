import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { IconContext } from "react-icons";
import { FaUser } from "react-icons/fa";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div>
      <header className="bg-gray-800 py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-white text-2xl font-bold">Minha Aplicação</h1>
          <nav>
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
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-gray-300"
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Bem-vindo à página inicial!</h1>
        <p className="text-gray-600">Esta é a página principal da aplicação.</p>
      </div>
    </div>
  );
}
