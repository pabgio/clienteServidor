import Usuario from "../models/Usuario.js";
import validator from "validator";
import mongoose from "mongoose";
import { createToken } from "./auth.js";
import { addInvalidToken } from "./tokenBlacklist.js";

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
      console.log("Todos os campos devem ser preenchidos!");
      return res
        .status(400)
        .json({ message: "Todos os campos devem ser preenchidos!" });
    }

    const user = await Usuario.findOne({ email });
    console.log(user);

    if (!user) {
      console.log("Credenciais inválidas!");
      return res.status(401).json({ message: "Credenciais inválidas!" });
    }

    if (password !== user.password) {
      console.log("Credenciais inválidas!");
      return res.status(401).json({ message: "Credenciais inválidas!" });
    }

    const token = createToken(user._id); // Use o customId para criar o token

    console.log("Login realizado com sucesso");
    return res.status(200).json({
      id: user.customId,
      name: user.name,
      email: user.email,
      token,
    });
    console.log(token);
  } catch (erro) {
    console.log("Erro no servidor!");
    return res.status(500).json({ message: "Erro no servidor!" });
  }
};

// Signup
export const criaUsuario = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);

    if (!name || !email || !password) {
      console.log("Todos os campos devem ser preenchidos!");
      return res
        .status(400)
        .json({ message: "Todos os campos devem ser preenchidos!" });
    }

    if (!validator.isEmail(email)) {
      console.log("Email inválido!");
      return res.status(400).json({ message: "Email inválido!" });
    }

    if (password.length < 2) {
      console.log("A senha não é forte o suficiente!");
      return res
        .status(400)
        .json({ message: "A senha não é forte o suficiente!" });
    }

    const exists = await Usuario.findOne({ email });
    console.log(exists);

    if (exists) {
      console.log("Este email já está sendo utilizado!");
      return res
        .status(422)
        .json({ message: "Este email já está sendo utilizado!" });
    }

    const user = await Usuario.create({
      name,
      email,
      password,
      customId: Math.floor(Math.random() * 1000), // Gere um customId aleatório
    });
    console.log(user);
    console.log("Usuário criado com sucesso");
    return res
      .status(201)
      .json({ id: user.customId, name: user.name, email: user.email });
  } catch (erro) {
    console.log("Erro no servidor!");
    return res.status(500).json({ message: "Erro no servidor!" });
  }
};

// Logout
export const logoutUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);

    // Adicione o token à lista negra (por exemplo, em um banco de dados ou cache)
    await addInvalidToken(token);

    console.log("Logout realizado com sucesso");
    res.status(200).json({ message: "Logout realizado com sucesso" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get All
export const getUsers = async (req, res) => {
  try {
    const usuarios = await Usuario.find({}).sort({ createdAt: -1 });
    console.log(usuarios);

    console.log("Usuários encontrados com sucesso");
    res.status(200).json(usuarios);
  } catch (error) {
    console.log("Erro no servidor!");
    res.status(500).json({ message: "Erro no servidor!" });
  }
};

// Get One
// Get One
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("ID de usuário inválido!");
      return res.status(400).json({ message: "ID de usuário inválido!" });
    }

    const usuario = await Usuario.findOne({ customId: id });

    if (!usuario) {
      console.log("Nenhum usuário encontrado!");
      return res.status(400).json({ message: "Nenhum usuário encontrado!" });
    }

    console.log("Usuário encontrado com sucesso");
    res.status(200).json(usuario);
  } catch (error) {
    console.log("Erro no servidor!");
    res.status(500).json({ message: "Erro no servidor!" });
  }
};

// Delete
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("ID de usuário inválido!");
      return res.status(400).json({ message: "ID de usuário inválido!" });
    }

    const usuario = await Usuario.findOneAndDelete({ customId: id });

    if (!usuario) {
      console.log("Nenhum usuário encontrado!");
      return res.status(400).json({ message: "Nenhum usuário encontrado!" });
    }

    console.log("Usuário deletado com sucesso");
    res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    console.log("Erro no servidor!");
    res.status(500).json({ message: "Erro no servidor!" });
  }
};

// Update
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findOne({ customId: id });

    if (!usuario) {
      console.log('Nenhum usuário encontrado!');
      return res.status(400).json({ message: 'Nenhum usuário encontrado!' });
    }

    const { email, senha } = req.body;

    if (senha) {
      // Verifique a senha atual do usuário
      if (md5(senha) !== usuario.password) {
        console.log('Senha atual inválida!');
        return res.status(400).json({ message: 'Senha atual inválida!' });
      }
    }

    // Faça as alterações no objeto usuario
    if (email) {
      usuario.email = email;
    }

    // Se uma nova senha foi fornecida e é diferente da senha atual, atualize a senha do usuário
    if (senha && md5(senha) !== usuario.password) {
      usuario.senha = md5(senha);
    }

    // Salve as alterações no banco de dados
    const usuarioAtualizado = await usuario.save();

    console.log('Usuário alterado com sucesso', usuarioAtualizado);
    res.status(200).json({ message: 'Usuário alterado com sucesso' });
  } catch (error) {
    console.log('Erro no servidor!');
    res.status(500).json({ message: 'Erro no servidor!' });
  }
};


