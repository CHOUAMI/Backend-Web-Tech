import jwt from 'jsonwebtoken';

const verifierToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Vérifie si l'en-tête d'authentification est fourni
  if (!authHeader) {
    return res.status(403).json({ message: 'Token requis' });
  }

  // Récupère le token après "Bearer"
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Token requis' });
  }

  // Vérifie la validité du token
  jwt.verify(token, 'votre_secret_jwt', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalide' });
    }

    // Stocke les informations de l'utilisateur dans la requête
    req.user = user;
    next();
  });
};

export default verifierToken;
