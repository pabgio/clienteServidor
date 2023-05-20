
import * as dotenv from "dotenv";
import Usuario from "../models/Usuario.js";
import jwt from "jsonwebtoken";
import validator from "validator";


dotenv.config();

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Todos os campos devem ser preenchidos!" });
    }

    const user = await Usuario.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Credenciais inválidas!" });
    }

    if (password !== user.password) {
      return res.status(401).json({ message: "Credenciais inválidas!" });
    }

    const token = createToken(user._id);

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (erro) {
    return res.status(500).json({ message: "Erro no servidor!" });
  }
};

// Signup
export const criaUsuario = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Todos os campos devem ser preenchidos!" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Email inválido!" });
    }

    if (password.length < 2) {
      return res
        .status(400)
        .json({ message: "A senha não é forte o suficiente!" });
    }

    const exists = await Usuario.findOne({ email });

    if (exists) {
      return res
        .status(422)
        .json({ message: "Este email já está sendo utilizado!" });
    }

    const user = await Usuario.create({
      name,
      email,
      password,
    });

    return res
      .status(201)
      .json({ _id: user._id, name: user.name, email: user.email });
  } catch (erro) {
    return res.status(500).json({ message: "Erro no servidor!" });
  }
};

// Logout
export const logoutUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    await logout(token);
    res.status(200).json({ message: "Logout realizado com sucesso" });
  } catch (erro) {
    res.status(400).json({ message: erro.message });
  }
};

// Get All
export const getUsers = async (req, res) => {
  const usuarios = await Usuario.find({}).sort({ createdAt: -1 });

  res.status(200).json(usuarios);
};

// Get One
export const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Nenhum usuário encontrado!" });
  }

  const usuario = await Usuario.findById(id);

  if (!usuario) {
    return res.status(400).json({ message: "Nenhum usuário encontrado!" });
  }

  res.status(200).json({ message: "Usuário encontrado com sucesso" });
};

// Delete
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Nenhum usuário encontrado!" });
  }

  const usuario = await Usuario.findOneAndDelete({ _id: id });

  if (!usuario) {
    return res.status(400).json({ message: "Nenhum usuário encontrado!" });
  }

  res.status(200).json({ msg: "Usuário deletado com sucesso" });
};

// Update
export const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Nenhum usuário encontrado!" });
  }

  const usuario = await Usuario.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!usuario) {
    return res.status(400).json({ message: "Nenhum usuário encontrado!" });
  }

  res.status(200).json({ message: "Usuário alterado com sucesso" });
};
