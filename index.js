const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const jurados = {
  "AAA111": "Carlos",
  "BBB222": "Marina",
  "CCC333": "Fernanda"
};

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
  jurado: String,
  turma: String,

  catAdequacaoTrama: Number,
  catCriatividade: Number,
  catConcepcaoCenica: Number,
  catExecucaoArtistica: Number,

  notaFinal: Number
});

app.get("/", (req, res) => {
  res.send("API funcionando!");
});

app.post("/notas", async (req, res) => {

  try {
    const nomeJurado = jurados[req.body.codigo];

    if (!nomeJurado) {

      return res.status(401).json({

        erro: "Código inválido"
      });
    }

    const nota = new Nota({
      jurado: nomeJurado,
      turma: req.body.turma,
      catAdequacaoTrama: req.body.catAdequacaoTrama,
      catCriatividade: req.body.catCriatividade,
      catConcepcaoCenica: req.body.catConcepcaoCenica,
      catExecucaoArtistica: req.body.catExecucaoArtistica,
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

app.get("/notas", async (req, res) => {

  try {

    const notas = await Nota.find();

    res.json(notas);

  } catch (erro) {

    res.status(500).json({
      erro: "Erro ao buscar notas"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando");
});