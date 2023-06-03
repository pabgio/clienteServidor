import  { Router }  from   'express' ;

import {
    cadastrarOcorrencia,
    getOcorrencias,
    getOcorrencia,
    updateOcorrencia,
    deletaOcorrencia,

} from "../controllers/ocorrenciaController.js";

export const ocorrenciaRouter = Router();

// Cria uma nova ocorrência
ocorrenciaRouter.post("/", (req, res) => {
    // Obtenha o token do cabeçalho da requisição
    const token = req.headers.authorization;
    cadastrarOcorrencia(req, res, token);
  });
// Retorna todas as ocorrências
ocorrenciaRouter.get("/", getOcorrencias);

// Retorna uma ocorrência específica
ocorrenciaRouter.get("/:id", getOcorrencia);

// Atualiza uma ocorrência específica
ocorrenciaRouter.put("/:id", updateOcorrencia);

// Deleta uma ocorrência específica
ocorrenciaRouter.delete("/:id", deletaOcorrencia);

