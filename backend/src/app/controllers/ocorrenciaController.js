import Ocorrencia from "../models/ocorrencia.js";
import mongoose from "mongoose";
import Usuario from "../models/Usuario.js";

// Cadastrar Ocorrência
export const cadastrarOcorrencia = async (req, res, token) => {
  try {
    const { ocurrence_type, registered_at, km, local, usuario_customId } = req.body;
    console.log(ocurrence_type, registered_at, km, local, usuario_customId, token);

    console.log(
      `Registered At -> ${registered_at} | Local -> ${local} | Ocurrence Type -> ${ocurrence_type} | Km -> ${km} | User Id -> ${usuario_customId}`
    );

    if (!token) {
      return res.status(401).json({ message: "Token não informado!" });
    }

    

    const user = await Usuario.findOne({ customId: usuario_customId });
    console.log(`User-> ${user}`);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    if (!registered_at || !local || !ocurrence_type || !km || !usuario_customId) {
      return res
        .status(400)
        .json({ message: "Todos os campos devem ser preenchidos!" });
    }

    const occurrence = await Ocorrencia.create({
      registered_at,
      local,
      ocurrence_type: ocurrence_type,
      km,
      usuario_customId,
    });

    return res.status(201).json({
      occurrence: occurrence.id,
      registered_at: occurrence.registered_at,
      local: occurrence.local,
      ocurrence_type: occurrence.ocurrence_type,
      km: occurrence.km,
      token: token,
      usuario_customId: occurrence.usuario_customId,
    });
  } catch (erro) {
    console.error(erro.message);
    return res.status(500).json({ message: "Erro no servidor!" });
  }
};

// Listar Ocorrências
export const getOcorrencias = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const ocorrencias = await Ocorrencia.find({}).sort({ createdAt: -1 });
    res.status(200).json(ocorrencias);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

// Visualizar Ocorrência
export const getOcorrencia = async (req, res) => {
  try {
    const { customId } = req.params;
    const ocorrencia = await Ocorrencia.findOne({ ocorrenciaId: customId });

    if (!ocorrencia) {
      console.log("Nenhuma ocorrência encontrada!");
      return res.status(404).json({ message: "Nenhuma ocorrência encontrada!" });
    }

    console.log("Ocorrência encontrada com sucesso");
    res.status(200).json(ocorrencia);
  } catch (error) {
    console.log("Erro no servidor!");
    res.status(500).json({ message: "Erro no servidor!" });
  }
};

// Excluir Ocorrência
export const deletaOcorrencia = async (req, res) => {
  try {
    const { customId } = req.params;
    const ocorrencia = await Ocorrencia.findOneAndDelete({ ocorrenciaId: customId });

    if (!ocorrencia) {
      console.log("Nenhuma ocorrência encontrada!");
      return res.status(404).json({ message: "Nenhuma ocorrência encontrada!" });
    }

    console.log("Ocorrência excluída com sucesso");
    res.status(200).json({ message: "Ocorrência excluída com sucesso" });
  } catch (error) {
    console.log("Erro no servidor!");
    res.status(500).json({ message: "Erro no servidor!" });
  }
};

// Atualizar Ocorrência
export const updateOcorrencia = async (req, res) => {
  try {
    const { ocorrenciaId } = req.params;
    const ocorrencia = req.body;

    const updatedOcorrencia = await Ocorrencia.findOneAndUpdate(
      { ocorrenciaId: ocorrenciaId },
      ocorrencia,
      { new: true }
    );

    if (!updatedOcorrencia) {
      console.log("Nenhuma ocorrência encontrada!");
      return res.status(404).json({ message: "Nenhuma ocorrência encontrada!" });
    }

    console.log("Ocorrência atualizada com sucesso");
    res.status(200).json({ message: "Ocorrência atualizada com sucesso" });
  } catch (error) {
    console.log("Erro no servidor!");
    res.status(500).json({ message: "Erro no servidor!" });
  }
};
