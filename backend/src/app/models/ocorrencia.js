import mongoose from "mongoose";
import Counter from "./counter.js";

const ocorrenciaSchema = new mongoose.Schema({
    _id: {
        type: Number,
        unique: true,
    },
    occurrence_type: {
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
        minlength: 10,
        maxlength: 9999,
    },
    user_id: {
        type: Number,
        ref: "Usuario",
        required: true,
        

    },
    local: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 125,
    },
    token: {
        type: String,
        required: true,
       
    },
});

// Pré-hook para buscar o usuário pelo customId antes de salvar uma ocorrência
ocorrenciaSchema.pre("save", async function (next) {
    if (!this.isNew) {
        return next();
      }
    
      try {
        const counter = await Counter.findByIdAndUpdate(
          "occurrenceIdCounter",
          { $inc: { sequence_value: 1 } },
          { new: true, upsert: true }
        );
    
        this._id = counter.sequence_value;
        next();
      } catch (error) {
        next(error);
      }
});



export default mongoose.model("Ocorrencia", ocorrenciaSchema);
