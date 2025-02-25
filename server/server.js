const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json("Rise2getHired API");
});

app.listen(process.env.PORT, () => {
  console.log(`server running at ${process.env.PORT}`);
});
