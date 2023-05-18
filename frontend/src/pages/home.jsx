import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

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
          <h1 className="text-white text-xl font-bold">Minha Aplicação</h1>
          <div>
            <Link href="/perfil " className="text-white hover:text-gray-300 mx-4">
              Perfil
            </Link>
            <button onClick={handleLogout} className="text-white hover:text-gray-300">
              Logout
            </button>
          </div>
        </div>
      </header>
      <h1>Bem-vindo à página inicial!</h1>
    </div>
  );
}
