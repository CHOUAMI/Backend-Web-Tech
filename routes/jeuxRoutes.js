import { Router } from "express";
import { createJeu, getJeux } from "../controllers/jeuxController.js";

const jeuxRoutes = Router();

// Récupérer la liste des jeux
jeuxRoutes.get('/', getJeux);

// Ajouter un nouveau jeu
jeuxRoutes.post('/', createJeu);

export default jeuxRoutes;
