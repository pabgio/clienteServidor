import  { Router }  from   'express' ;

import {
  loginUser,
  criaUsuario,
  logoutUser,
  getUsers,
  
  deleteUser,
  updateUser,
} from "../controllers/usuarioController.js";

export const userRouter = Router();

// Login
userRouter.post("/login", loginUser);

// Signup
userRouter.post("/users", criaUsuario);

// Logout
userRouter.post("/logout", logoutUser);

// Others routes
userRouter.get("/", getUsers);

userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
