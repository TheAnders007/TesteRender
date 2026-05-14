const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

mongoose.connect(process.env.MONGO_URL);

const Nota = mongoose.model("Nota", {
  notaFinal: Number
});

app.use(express.json());

app.post("/notas", async (req, res) => {

  const nota = new Nota({
    notaFinal: req.body.notaFinal
  });

  await nota.save();

  res.json({
    mensagem: "Salvo!"
  });
})