

import { User } from '../models/users.js';// Importer le modèle User
  


const autoriser = (roles) => async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId);

        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé." });

        if (roles && !roles.includes(user.roleId)) {
            return res.status(403).json({ message: "Accès refusé." });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur.", error });
    }
};

export default autoriser;
