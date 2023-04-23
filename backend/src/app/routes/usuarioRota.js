import  { Router }  from   'express' ;

import { listaUsuarios, criaUsuarios, deletaUsuario } from '../controllers/usuarioController.js';

export const usuarioRota = Router();

usuarioRota.get("/", listaUsuarios);
usuarioRota.post("/", criaUsuarios);
usuarioRota.delete("/:id", deletaUsuario);