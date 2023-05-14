
import bcrypt from "bcrypt";
import validator from "validator";

import Usuario from "../models/Usuario.js";
import userSchema from "../models/Usuario.js";


export const signup = async function (nome, email, senha)  {
  // Validação
  if (!nome || !email || !senha) {
    throw Error("Todos os campos devem ser preenchidos!");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email inválido!");
  }

  if (senha.length < 2) {
    throw Error("A senha não é forte o suficiente!");
  }

  const exists = await userSchema.findOne({ email });

  if (exists) {
    throw Error("Este email já está sendo utilizado!");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(senha, salt);

  const user = await Usuario.create({ nome, email, senha: hash });

  return user;
};

export const login = async function (email, senha) {
  // Validação
  if (!email || !senha) {
    throw Error("Todos os campos devem ser preenchidos!");
  }

  const user = await userSchema.findOne({ email });

  if (!user) {
    throw Error("Usuário não encontrado!");
  }

  const match = await bcrypt.compare(senha, user.senha);

  if (!match) {
    throw Error("Senha incorreta!");
  }

  return user;
};




