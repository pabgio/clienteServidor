import React, { useState, useEffect, useContext } from "react";
import { usePerfil } from "../hooks/usePerfil.js";
import styles from "../styles/AlterarPerfilPage.module.css";
import Navbar from "../components/Navbar.jsx";
import { AuthContext } from "../context/AuthContext.jsx";

const AlterarPerfilPage = () => {
  const { atualizarPerfil, isLoading, error } = usePerfil();
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [isAlterarSenha, setIsAlterarSenha] = useState(false);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isAlterarSenha && novaSenha !== confirmarSenha) {
      setError("A nova senha e a confirmação de senha não correspondem.");
      return;
    }

    const profileData = {
      email,
      senha: senhaAtual,
      novaSenha: isAlterarSenha ? novaSenha : "",
    };

    atualizarPerfil(profileData);
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <h1 className="text-2xl font-semibold mb-4 text-center">Alterar Perfil</h1>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2 bg-gray-50"
            
            />
          </div>
          <div className={styles.formGroup}>
            <label>Senha Atual:</label>
            <input
              type="password"
              value={senhaAtual}
              onChange={(e) => setSenhaAtual(e.target.value)}
              className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2 bg-gray-50"
            
            />
          </div>
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              checked={isAlterarSenha}
              onChange={(e) => setIsAlterarSenha(e.target.checked)}
            
            />
            <label>Alterar Senha</label>
          </div>
          {isAlterarSenha && (
            <>
              <div className={styles.formGroup}>
                <label>Nova Senha:</label>
                <input
                  type="password"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2 bg-gray-50"
            
                />
              </div>
              <div className={styles.formGroup}>
                <label>Confirmar Nova Senha:</label>
                <input
                  type="password"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2 bg-gray-50"
            
                />
              </div>
            </>
          )}
          <button type="submit" disabled={isLoading} className={styles.button}>
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
};

export default AlterarPerfilPage;
