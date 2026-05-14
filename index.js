const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB conectado!");
  })
  .catch((erro) => {
    console.log("Erro ao conectar:", erro);
  });

const Nota = mongoose.model("Nota", {
  notaFinal: Number
});


app.post("/notas", async (req, res) => {

  const nota = new Nota({
    notaFinal: req.body.notaFinal
  });

  await nota.save();

  res.json({
    mensagem: "Salvo!"
  });
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando");
});