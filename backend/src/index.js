import * as dotenv from "dotenv";
import express from "express";
import { userRouter } from "./app/routes/usuarioRota.js";
import { ocorrenciaRouter } from "./app/routes/ocorrenciasRotas.js";
import { conectaDatabase } from "./database/database.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/users", userRouter);
app.use("/ocorrencias", ocorrenciaRouter);

conectaDatabase()
  .then(() => {
    const porta = process.env.PORT;

    app.listen(porta, () => {
      console.log(`🟢 Servidor rodando em http://localhost:${porta}`);
    });
  })
  .catch((erro) => {
    console.error(erro);
    console.error("🔴 Erro ao conectar-se ao servidor!");
  });
