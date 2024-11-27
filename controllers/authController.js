import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

export const login = async (req, res) => {
  const { email, motDePasse } = req.body;

  try {
    console.log(`Tentative de connexion pour l'email : ${email}`);

    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.error('Utilisateur non trouvé');
      return res.status(401).json({ message: 'Utilisateur ou mot de passe incorrect' });
    }

    console.log(`Utilisateur trouvé : ${user.email}`);

    const isPasswordValid = await bcrypt.compare(motDePasse, user.motDePasse);
    if (!isPasswordValid) {
      console.error('Mot de passe incorrect');
      return res.status(401).json({ message: 'Utilisateur ou mot de passe incorrect' });
    }

    console.log('Mot de passe validé avec succès');

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ token });
  } catch (error) {
    console.error('Erreur lors de la tentative de connexion :', error.message);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
};
