import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const createToken = (customId) => {
  return jwt.sign({ customId }, process.env.JWT_SECRET, { expiresIn: "3d" });
};
