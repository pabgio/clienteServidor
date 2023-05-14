import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 125,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 125,
  },
  senha: {
    type: String,
    required: true,
    minlength: 8,
    maxWidth: 125,
  },
});

export default mongoose.model("Usuario", userSchema);



