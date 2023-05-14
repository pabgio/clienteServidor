import  { Router }  from   'express' ;

import {
    getOcorrencias,
    getOcorrencia,
    criaOcorrencia,
    updateOcorrencia,
    deletaOcorrencia,
} from "../controllers/ocorrenciaController.js";

export const ocorrenciaRouter = Router();

// Cria uma nova ocorrência
ocorrenciaRouter.post("/", criaOcorrencia);

// Retorna todas as ocorrências
ocorrenciaRouter.get("/", getOcorrencias);

// Retorna uma ocorrência específica
ocorrenciaRouter.get("/:id", getOcorrencia);

// Atualiza uma ocorrência específica
ocorrenciaRouter.put("/:id", updateOcorrencia);

// Deleta uma ocorrência específica
ocorrenciaRouter.delete("/:id", deletaOcorrencia);

