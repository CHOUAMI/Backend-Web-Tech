import express from 'express';
import {
  createLogo,
  getAllLogos,
  getLogoById,
  updateLogo,
  deleteLogo
} from '../controllers/logosController.js';

const router = express.Router();

// Routes pour les logos
router.post('/', createLogo);
router.get('/', getAllLogos);
router.get('/:id', getLogoById);
router.put('/:id', updateLogo);
router.delete('/:id', deleteLogo);

export default router;
