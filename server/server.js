import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PORT } from "./config/config.js";
import connectDB from "./config/connect.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json("Rise2getHired API");
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server running at ${PORT}`);
    });
  } catch (error) {
    console.log("Server not able to start ---->", error);
  }
};

start();
