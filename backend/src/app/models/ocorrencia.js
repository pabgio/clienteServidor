import mongoose from "mongoose";
import Usuario from "./Usuario.js";

const ocorrenciaSchema = new mongoose.Schema({
    tipo: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 125,
    },
    registro: {
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
    usuario_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: Usuario,
        required: true,
        minlength: 1,
        maxlength: 125,
    },
});

export default mongoose.model("Ocorrencia", ocorrenciaSchema);
