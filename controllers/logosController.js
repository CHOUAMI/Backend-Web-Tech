import Logos from '../models/logos.js';
import Projet from '../models/projets.js';

// Créer un nouveau logo
export const createLogo = async (req, res) => {
  try {
    const { logoUrl, projetId } = req.body;

    // Vérifier que le projet existe
    const projet = await Projet.findByPk(projetId);
    if (!projet) {
      return res.status(404).json({ message: 'Projet introuvable' });
    }

    // Créer le logo
    const newLogo = await Logos.create({ logoUrl, projetId });
    res.status(201).json(newLogo);
  } catch (error) {
    console.error('Erreur lors de la création du logo:', error);
    res.status(500).json({ message: 'Erreur lors de la création du logo' });
  }
};

// Récupérer tous les logos
export const getAllLogos = async (req, res) => {
  try {
    const logos = await Logos.findAll({ include: Projet });
    res.status(200).json(logos);
  } catch (error) {
    console.error('Erreur lors de la récupération des logos:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des logos' });
  }
};

// Récupérer un logo par ID
export const getLogoById = async (req, res) => {
  try {
    const { id } = req.params;
    const logo = await Logos.findByPk(id, { include: Projet });

    if (!logo) {
      return res.status(404).json({ message: 'Logo introuvable' });
    }

    res.status(200).json(logo);
  } catch (error) {
    console.error('Erreur lors de la récupération du logo:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération du logo' });
  }
};

// Mettre à jour un logo
export const updateLogo = async (req, res) => {
  try {
    const { id } = req.params;
    const { logoUrl, projetId } = req.body;

    // Vérifier si le logo existe
    const logo = await Logos.findByPk(id);
    if (!logo) {
      return res.status(404).json({ message: 'Logo introuvable' });
    }

    // Vérifier que le projet existe
    const projet = await Projet.findByPk(projetId);
    if (!projet) {
      return res.status(404).json({ message: 'Projet introuvable' });
    }

    // Mettre à jour le logo
    logo.logoUrl = logoUrl;
    logo.projetId = projetId;
    await logo.save();

    res.status(200).json(logo);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du logo:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du logo' });
  }
};

// Supprimer un logo
export const deleteLogo = async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifier si le logo existe
    const logo = await Logos.findByPk(id);
    if (!logo) {
      return res.status(404).json({ message: 'Logo introuvable' });
    }

    // Supprimer le logo
    await logo.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Erreur lors de la suppression du logo:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du logo' });
  }
};
