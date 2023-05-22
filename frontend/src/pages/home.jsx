import { useRouter } from "next/router";
import { IconContext } from "react-icons";
import { FaUser } from "react-icons/fa";
import { useAuthentication } from "../components/auth.js";
import Navbar from "../components/Navbar.jsx";



export default function HomePage() {
  useAuthentication();

  

  return (
    <div>
    
        <Navbar />
     
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Bem-vindo à página inicial!</h1>
        <p className="text-gray-600">Esta é a página principal da aplicação.</p>
      </div>
    </div>
  );
}
