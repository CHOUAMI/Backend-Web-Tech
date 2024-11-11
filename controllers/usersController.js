import User from "../models/users.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const createUser = async (req, res) => {
  try {
    const { nom, email, motDePasse, RoleId } = req.body;

    if (!nom || !email || !motDePasse) {
      return res.status(400).json({ message: 'Tous les champs (nom, email, motDePasse) sont requis.' });
    }

    const nouvelUtilisateur = await User.create({ nom, email, motDePasse, RoleId });
    res.status(201).json({ message: 'Utilisateur créé avec succès', utilisateur: nouvelUtilisateur });
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};