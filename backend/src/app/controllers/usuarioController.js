import { Usuario } from '../models/Usuario.js';
import mongoose from 'mongoose';

export const criaUsuarios = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        const camposVazios= [];
        if (!nome) {
            camposVazios.push('nome');
        }
        if (!email) {
            camposVazios.push('email');
        }
        if (!senha) {
            camposVazios.push('senha');
        }
        if (camposVazios.length > 0) {
            return res.status(400).json({
                msg: `Campos ${camposVazios.join(', ')} não podem ser vazios!`
            })
        }

      const usuario = await Usuario.create({ nome, email, senha });
      res.status(201).json(usuario);

    } catch (erro) {
        console.log(erro);
        res.status(500).send({ erro: 'Erro ao criar usuário!' });
    }
}; 

//criando usuario


//lista usuarios
export const listaUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).send(usuarios);
    } catch (erro) {
        console.log(erro);
        res.status(500);
    }
};


//deletar usuario

export const deletaUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'Id inválido!' });
        }
        const usuario = await Usuario.findByIdAndDelete(id);
        if (!usuario) {
            return res.status(404).json({ msg: 'Usuário não encontrado!' });
        }
        res.status(200).json(usuario);
    } catch (erro) {
        console.log(erro);
        res.status(500).send({ erro: 'Erro ao deletar usuário!' });
    }
};