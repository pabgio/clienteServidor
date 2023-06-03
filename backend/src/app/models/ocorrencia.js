import mongoose from "mongoose";
import Usuario from "./Usuario.js";

const ocorrenciaSchema = new mongoose.Schema({
    ocorrenciaId: {
        type: Number,
        required: true,
        unique: true
    },
    ocurrence_type: {
        type: Number,
        required: true,
    },
    registered_at: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 125,
    },
    km: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 125,
    },
    usuario_customId: {
        type: Number,
        required: true,
       
    },
    local: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 125,
    },
});

// Pré-hook para buscar o usuário pelo customId antes de salvar uma ocorrência
ocorrenciaSchema.pre("save", async function (next) {
    try {
        const usuario = await Usuario.findOne({ customId: usuario_customId });
        if (!usuario) {
            throw new Error("Usuário não encontrado");
        }
        next();
    } catch (error) {
        next(error);
    }
});

export default mongoose.model("Ocorrencia", ocorrenciaSchema);
