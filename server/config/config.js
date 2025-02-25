import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const PORT = process.env.PORT || 5000;

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });
};
