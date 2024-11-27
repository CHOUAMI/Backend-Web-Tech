import express from 'express';
import bcrypt from 'bcrypt'; // Assurez-vous que bcrypt est installé
import jwt from 'jsonwebtoken'; // Assurez-vous que jsonwebtoken est installé
import User  from '../models/users.js'; // Modèle utilisateur
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

const router = express.Router();

// Route POST pour la connexion
router.post('/login', async (req, res) => {
  const { email, motDePasse } = req.body; // Récupérer email et mot de passe depuis le corps de la requête

  // Validation des champs
  if (!email || !motDePasse) {
    return res.status(400).json({ message: 'Email et mot de passe sont requis.' });
  }

  try {
    // Vérifier si l'utilisateur existe dans la base de données
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.error(`Utilisateur introuvable pour l'email : ${email}`);
      return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
    }

    console.log(`Utilisateur trouvé : ${user.email}`);

    // Vérifier le mot de passe (comparaison avec bcrypt)
    const isPasswordValid = await bcrypt.compare(motDePasse, user.motDePasse);
    if (!isPasswordValid) {
      console.error('Mot de passe incorrect.');
      return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email }, // Données à encoder dans le token
      process.env.JWT_SECRET, // Clé secrète
      { expiresIn: '1h' } // Durée de validité du token
    );

    console.log('Token généré avec succès.');
    return res.status(200).json({ token }); // Réponse avec le token
  } catch (error) {
    console.error('Erreur lors de la tentative de connexion :', error.message);
    return res.status(500).json({ message: 'Erreur serveur.' });
  }
});

export default router;
