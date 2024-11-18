import express from 'express';
import { createSiteWeb, getSitesWeb } from '../controllers/sitewebController.js';

const router = express.Router();

// Route pour récupérer tous les sites web
router.get('/', getSitesWeb);

// Route pour créer un nouveau site web
router.post('/', createSiteWeb);

export default router;
