import React from "react";
import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Input from "@/components/form/input";
import Button from "@/components/form/button";
import { useLogin } from "@/hooks/useLogin";
import Error from "@/components/error";

export default function ProfilePage() {
    const [email, getEmail] = useState("");
    const [nome, setNome] = useState("");
    const { login, error, isLoading } = useLogin();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        await login(email, senha);
    }
    
    return (
        <div className="bg-gray-800 min-h-screen flex items-center justify-center">
          <div className="card bg-white shadow-lg max-w-md md:w-[100%] w-full max-h-[90vh]">
            <div className="relative h-72">
              <Image src="/road2.jpg" alt="rua" width={500} height={500} priority />
            </div>
    
            <div className="p-8">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-800">
                Perfil
              </h3>
    
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Nome:</label>
                <span className="text-gray-900">{nome}</span>
              </div>
    
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Email:</label>
                <span className="text-gray-900">{email}</span>
              </div>
    
              <div className="flex justify-center">
                <Link href="/alterar-usuario" className="text-blue-500 hover:text-blue-700">
                  Alterar Usuário
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
  }
  