import Login from "./login";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { useRouter } from "next/router";
import { useEffect } from "react";

config.autoAddCss = false;

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      router.push("/home");
    }
  }, []);

  return (
    <>
      <Login />
    </>
  );
}
