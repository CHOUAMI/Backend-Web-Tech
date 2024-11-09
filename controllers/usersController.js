import Users from '../models/users.js';

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error });
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = await Users.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', error });
  }
};
