import jwt from 'jsonwebtoken';
import { User } from '../models/index.js'; 


const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ message: 'Authentification requise' });
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    app.use((req, res) => {
      res.status(404).json({ message: 'Resource not found' });
    });
    

    const user = await User.findByPk(decoded.id); // Remplacez findById par findByPk
    if (!user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }

    req.user = user; // Ajout de l'utilisateur au `req` pour un accès ultérieur
    next();
  } catch (error) {
    console.error('Erreur de middleware d\'authentification:', error.message);
    res.status(401).json({ message: 'Authentification invalide' });
  }
};

export default authMiddleware;
