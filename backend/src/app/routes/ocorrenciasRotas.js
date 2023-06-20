import  { Router }  from   'express' ;

import {
    cadastrarOcorrencia,
    getOccurrences,
    getOccurence,
    updateOcorrencia,
    deletaOcorrencia,

} from "../controllers/ocorrenciaController.js";

export const ocorrenciaRouter = Router();

// Cria uma nova ocorrência
ocorrenciaRouter.post("/", cadastrarOcorrencia);
// Retorna todas as ocorrências
ocorrenciaRouter.get("/", getOccurrences);


// Retorna uma ocorrência específica

ocorrenciaRouter.get("/users/:id", getOccurence);

// Atualiza uma ocorrência específica
ocorrenciaRouter.put("/:id", updateOcorrencia);

// Deleta uma ocorrência específica
ocorrenciaRouter.delete("/:id", deletaOcorrencia);

