import Roles from '../models/roles.js';

// Contrôleur pour récupérer tous les rôles
export const getRoles = async (req, res) => {
  try {
    const roles = await Roles.findAll();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving roles', error });
  }
};

// Contrôleur pour créer un nouveau rôle
export const createRole = async (req, res) => {
  try {
    const newRole = await Roles.create(req.body);
    res.status(201).json(newRole);
  } catch (error) {
    res.status(500).json({ message: 'Error creating role', error });
  }
};
