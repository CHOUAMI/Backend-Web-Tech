import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/users.js';


const router = express.Router();

// Route POST pour la connexion
router.post('/login', async (req, res) => {
  const { email, motDePasse } = req.body; // Récupérer email et mot de passe depuis le corps de la requête

  try {
    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Utilisateur ou mot de passe incorrect' });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(motDePasse, user.motDePasse);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Utilisateur ou mot de passe incorrect' });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.error('Erreur lors de la tentative de connexion :', error.message);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
});

export default router;
