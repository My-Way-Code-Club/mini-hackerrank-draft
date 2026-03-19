import express from "express";
import { FileChallengeRepository } from "./challenge-repository";

const app = express();
const challengeRepository = new FileChallengeRepository();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

app.post("/challenges", (req, res) => {
  const challenge = req.body.challenge;

  if (typeof challenge !== "string" || !challenge.trim()) {
    res.status(400).json({
      message: "El campo 'challenge' es obligatorio y debe ser un texto no vacio.",
    });
    return;
  }

  challengeRepository.add(challenge.trim());
  res.status(201).json({ message: "Reto agregado correctamente." });
});

app.get("/challenges", (_req, res) => {
  const challenges = challengeRepository.getAll();
  res.status(200).json({ challenges });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
