// controllers/projetsController.js
import Projets from '../models/projets.js';

// Utilisez ensuite `Projets` pour vos opérations de base de données
export const getProjets = async (req, res) => {
  try {
    const projets = await Projets.findAll();
    res.json(projets);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving projects', error });
  }
};

export const createProjet = async (req, res) => {
  try {
    const newProjet = await Projets.create(req.body);
    res.status(201).json(newProjet);
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error });
  }
};
