import  { Router }  from   'express' ;

import {
  loginUser,
  criaUsuario,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} from "../controllers/usuarioController.js";

export const userRouter = Router();

// Login
userRouter.post("/login", loginUser);

// Signup
userRouter.post("/", criaUsuario);

// Others routes
userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
