import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  customId: {
    type: Number,
    required: true,
    unique: true
  },

  name: {
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
  password: {
    type: String,
    required: true,
    minlength: 2,
    maxWidth: 125,
  },
});

export default mongoose.model("Usuario", userSchema);



