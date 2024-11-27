import express from 'express';
import { register, login } from './controllers/authController.js';
import authMiddleware from './authentification/authMiddleware.js';
import autoriser from './authentification/autorisation.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Exemple de route protégée
router.get('/protected', authMiddleware, autoriser(['admin']), (req, res) => {
  res.json({ message: 'Accès autorisé' });
});

export default router;
