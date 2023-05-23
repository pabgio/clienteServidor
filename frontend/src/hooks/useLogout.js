import { useAuthContext } from "./useAuthContext";
import { useRouter } from "next/router";
import { apiUrl } from "./config";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const router = useRouter();

  const logout = async () => {
    try {
      const token = localStorage.getItem("user")?.token;

      if (token) {
        await fetch(`${apiUrl}/users/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }

    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    router.push("/login");
  };

  return { logout };
};
