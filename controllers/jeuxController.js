import Jeux from '../models/jeux.js';

export const getJeux = async (req, res) => {
  try {
    const jeux = await Jeux.findAll();
    res.json(jeux);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving games', error });
  }
};

export const createJeu = async (req, res) => {
  try {
    const newJeu = await Jeux.create(req.body);
    res.status(201).json(newJeu);
  } catch (error) {
    res.status(500).json({ message: 'Error creating game', error });
  }
};