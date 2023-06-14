import React, { useState, useEffect, useContext } from "react";
import { usePerfil } from "../hooks/usePerfil.js";
import Navbar from "../components/Navbar.jsx";
import { AuthContext } from "../context/AuthContext.jsx";

const AlterarPerfilPage = () => {
  const { atualizarPerfil, isLoading, error } = usePerfil();
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [changePassword, setChangePassword] = useState(false)

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async(e) => {
    e.preventDefault();

    await atualizarPerfil(
      name,
      email,
      password,

    );

  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div
          className={`rounded-md bg-indigo-600 p-8 ${
            changePassword ? "w-96" : "w-96"
          }`}
        >
          <h1 className="mb-4 text-center text-xl text-white">Alterar dados</h1>
          <form onSubmit={handleSubmit}>
            <label className="text-white">
              Nome:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full rounded-md bg-white p-2 text-black"
              />
            </label>
            <br />
            <label className="text-white">
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-md bg-white text-black"
              />
            </label>
            <br />
            <div className="mt-3 flex items-center">
              <label className="flex items-center text-white">
                <span className="mr-2">Alterar senha:</span>
                <input
                  type="checkbox"
                  checked={changePassword}
                  onChange={(e) => setChangePassword(e.target.checked)}
                  className="form-checkbox mt-1 text-green"
                />
              </label>
            </div>

            {changePassword && (
              <>
                <br />
                <label className="text-white">
                  Nova senha:
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-2 w-full rounded-md bg-white p-2 text-black"
                  />
                </label>
              </>
            )}
            <br />
            <button
              type="submit"
              className="mt-4 rounded-md bg-green-500 px-4 py-2 text-white"
              disabled={isLoading}
            >
              Atualizar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
export default AlterarPerfilPage;
