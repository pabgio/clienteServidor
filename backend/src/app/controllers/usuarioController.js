import {
  login,
  signup,
  logout,
} from "../middleware/auth.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import Usuario from "../models/Usuario.js";

dotenv.config();

const createToken = (_id) => {
  return jwt.sign({
    _id
  }, process.env.JWT_SECRET, {
    expiresIn: "3d"
  });
};

// Login
export const loginUser = async (req, res) => {
  const {
    email,
    senha
  } = req.body;

  try {
    const user = await login(email, senha);

    const token = createToken(user._id);

    res.status(200).json({
      email,
      token
    });
  } catch (erro) {
    res.status(400).json({
      error: erro.message
    });
  }
};

// Signup
export const criaUsuario = async (req, res) => {
  const {
    nome,
    email,
    senha
  } = req.body;

  try {
    const user = await signup(nome, email, senha);

    const token = createToken(user._id);

    res.status(200).json({
      email,
      token
    });
  } catch (erro) {
    res.status(400).json({
      error: erro.message
    });
  }
};

// Logout
export const logoutUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    await logout(token);
    res.status(200).json({
      msg: "Logout realizado com sucesso"
    });
  } catch (erro) {
    res.status(400).json({
      error: erro.message
    });
  }
};


// Get All
export const getUsers = async (req, res) => {
  const usuarios = await Usuario.find({}).sort({
    createdAt: -1
  });

  res.status(200).json(usuarios);
};

// Get One
export const getUser = async (req, res) => {
  const {
    id
  } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      erro: "Nenhum usuário encontrado!"
    });
  }

  const usuario = await Usuario.findById(id);

  if (!usuario) {
    return res.status(400).json({
      erro: "Nenhum usuário encontrado!"
    });
  }

  res.status(200).json({
    msg: "Usuário encontrado com sucesso"
  });
};

// Delete
export const deleteUser = async (req, res) => {
  const {
    id
  } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      erro: "Nenhum usuário encontrado!"
    });
  }

  const usuario = await Usuario.findOneAndDelete({
    _id: id
  });

  if (!usuario) {
    return res.status(400).json({
      erro: "Nenhum usuário encontrado!"
    });
  }

  res.status(200).json({
    msg: "Usuário deletado com sucesso"
  });
};

// Update
export const updateUser = async (req, res) => {
  const {
    id
  } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      erro: "Nenhum usuário encontrado!"
    });
  }

  const usuario = await Usuario.findOneAndUpdate({
    _id: id
  }, {
    ...req.body,
  });

  if (!usuario) {
    return res.status(400).json({
      erro: "Nenhum usuário encontrado!"
    });
  }

  res.status(200).json({
    msg: "Usuário alterado com sucesso"
  });
};