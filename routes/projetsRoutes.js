import { Router } from "express";
import { createProjet, getProjets } from "../controllers/projetsController.js";

const projetsRoutes = Router();

// Route pour récupérer la liste des projets
projetsRoutes.get('/', getProjets);

// Route pour ajouter un nouveau projet
projetsRoutes.post('/', createProjet);

export default projetsRoutes;
