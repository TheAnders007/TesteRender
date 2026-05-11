const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend funcionando!");
});

app.get("/mensagem", (req, res) => {
  res.json({
    texto: "Olá do backend!"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando");
});