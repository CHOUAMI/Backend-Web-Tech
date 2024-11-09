import { Router } from 'express';
import { getRoles, createRole } from '../controllers/rolesController.js';

const rolesRoutes = Router();

// Route pour récupérer tous les rôles
rolesRoutes.get('/', getRoles);

// Route pour ajouter un nouveau rôle
rolesRoutes.post('/', createRole);

export default rolesRoutes;
