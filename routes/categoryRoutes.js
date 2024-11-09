import express from 'express'; 
import { createCategory, getCategories } from '../controllers/categoryController.js';
const router = express.Router();

// Route pour récupérer toutes les catégories
router.get('/', getCategories);

// Route pour créer une nouvelle catégorie
router.post('/', createCategory);

export default router;