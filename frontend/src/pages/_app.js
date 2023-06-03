import "@/styles/globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";


export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <ToastContainer />


      <Component {...pageProps} />
    </AuthContextProvider>
  );
}
