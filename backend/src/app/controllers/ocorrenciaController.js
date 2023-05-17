import Ocorrencia from "../models/ocorrencia.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

// Cria uma nova ocorrência
export const criaOcorrencia = async (req, res) => {
    const {
        registro,
        local,
        tipo,
        km
    } = req.body;

    try {
        const ocorrencia = await Ocorrencia.create({
            registro,
            local,
            tipo,
            km,
            user_id: req.user._id, // extrai o id do objeto user
        });

        res.status(201).json("Ocorrência criada com sucesso.");
    } catch (erro) {
        res.status(400).json({
            erro: "Não foi possível criar a ocorrência."
        });
    }
};

// Retorna todas as ocorrências
export const getOcorrencias = async (req, res) => {
    try {
        const ocorrencias = await Ocorrencia.find({}).sort({
            registro: -1
        });
        res.status(200).json(ocorrencias);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// Retorna uma ocorrência específica
export const getOcorrencia = async (req, res) => {
    const {
        id
    } = req.params;

    try {
        const ocorrencia = await Ocorrencia.findById(id);
        if (!ocorrencia) {
            return res.status(404).json({
                error: "Ocorrência não encontrada."
            });
        }
        res.status(200).json(ocorrencia);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// Atualiza uma ocorrência existente
export const updateOcorrencia = async (req, res) => {
    const {
        id
    } = req.params;
    const {
        registro,
        local,
        tipo,
        km,
        user_id
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            error: "ID de ocorrência inválido."
        });
    }

    try {
        const ocorrencia = await Ocorrencia.findById(id);
        if (!ocorrencia) {
            return res.status(404).json({
                error: "Ocorrência não encontrada."
            });
        }

        const updatedOcorrencia = {
            registro,
            local,
            tipo,
            km,
            user_id
        };

        await Ocorrencia.findByIdAndUpdate(id, updatedOcorrencia, {
            new: true
        });

        res.status(200).json({
            message: "Ocorrência atualizada com sucesso."
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// Remove uma ocorrência existente
export const deletaOcorrencia = async (req, res) => {
    const {
        id
    } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            error: "ID de ocorrência inválido."
        });
    }

    try {
        const ocorrencia = await Ocorrencia.findById(id);
        if (!ocorrencia) {
            return res.status(404).json({
                error: "Ocorrência não encontrada."
            });
        }

        await Ocorrencia.findByIdAndRemove(id);

        res.status(200).json({
            message: "Ocorrência removida com sucesso."
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

//Verifica se o usuário está autenticado
export const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization") ?.replace("Bearer ", "") ?.trim(); //Pega o token do header da requisição

    if (!token) {
        return res.status(401).json({
            error: "Não autorizado."
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({
                error: "Não autorizado."
            });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            error: "Não autorizado."
        });
    }
};
//Retorna todas as ocorrências de um usuário específico
export const getOcorrenciasByUserId = async (req, res) => {
    const {
        id
    } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            error: "ID de usuário inválido."
        });
    }

    try {
        const ocorrencias = await Ocorrencia.find({
            user_id: id
        }).sort({
            registered_at: -1,
        });
        res.status(200).json(ocorrencias);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};