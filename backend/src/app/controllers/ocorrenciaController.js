import Ocorrencia from "../models/ocorrencia.js";
import InvalidToken from "../models/InvalidToken.js";
import Usuario from "../models/Usuario.js";

// Cadastrar Ocorrência
export const cadastrarOcorrencia = async (req, res) => {
  try {
    const { registered_at, local, occurrence_type, km, user_id } = req.body;
    const token = req.headers.authorization;

    console.log(
      `Registered At -> ${registered_at} | Local -> ${local} | Occurrence Type -> ${occurrence_type} | Km -> ${km} | User Id -> ${user_id} | Token -> ${token}`
    );

    if (!token) {
      return res.status(401).json({ message: "Token não informado!" });
    }

    const invalidToken = await InvalidToken.findOne({ token });

    if (invalidToken) {
      return res.status(401).json({ message: "Token inválido" });
    }

    const user = await Usuario.findOne({ _id: user_id });
    console.log(`User -> ${user}`);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    if (!registered_at || !local || !occurrence_type || !km || !user_id) {
      return res
        .status(400)
        .json({ message: "Todos os campos devem ser preenchidos!" });
    }

    const occurrence = await Ocorrencia.create({
      registered_at,
      local,
      occurrence_type,
      km,
      user_id,
      token,
    });

    return res.status(201).json({
      id: occurrence._id,
      registered_at: occurrence.registered_at,
      local: occurrence.local,
      occurrence_type: occurrence.occurrence_type,
      km: occurrence.km,
      user_id: occurrence.user_id,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Erro no servidor!" });
  }
};

export const getOccurrences = async (req, res) => {
try {
  const data = await Ocorrencia.find({});
  if (data.length > 0) {
    const occurrences = data.map((occurrence) => ({
      id: occurrence._id,
      registered_at: occurrence.registered_at,
      local: occurrence.local,
      occurrence_type: occurrence.occurrence_type,
      km: occurrence.km,
      token: occurrence.token,
      user_id: occurrence.user_id,
    }));
    res.status(200).json(occurrences);
  } else {
    res.status(404).json({ message: "Nenhuma ocorrência encontrada" });
  }
} catch (error) {
  res.status(500).json({ message: "Erro no servidor" });
}
};


// Visualizar Ocorrência


// Excluir Ocorrência
export const deletaOcorrencia = async (req, res) => {
  try {
    const { customId } = req.params;
    const ocorrencia = await Ocorrencia.findOneAndDelete({ _id: customId });

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
    const { _id } = req.params;
    const ocorrencia = req.body;

    const updatedOcorrencia = await Ocorrencia.findOneAndUpdate(
      { _id: _id },
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
