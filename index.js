const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Mongo conectado!");
  })
  .catch((erro) => {
    console.log("Erro ao conectar Mongo:", erro);
  });

const Nota = mongoose.model("Nota", {
  notaFinal: Number
});

app.get("/", (req, res) => {
  res.send("API funcionando!");
});

app.post("/notas", async (req, res) => {

  try {

    const nota = new Nota({
      notaFinal: req.body.notaFinal
    });

    await nota.save();

    res.json({
      mensagem: "Salvo!"
    });

  } catch (erro) {

    console.log("Erro ao salvar:", erro);

    res.status(500).json({
      erro: "Erro interno"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando");
});