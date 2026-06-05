import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import type { Request, Response } from "express"; // Ajout du mot-clé 'type'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Route de test (Health Check)
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    message: "Le serveur Express tourne parfaitement avec TypeScript !",
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
