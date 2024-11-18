import SiteWeb from '../models/siteweb.js';

// Récupérer tous les sites web
export const getSitesWeb = async (req, res) => {
    try {
        const sites = await SiteWeb.findAll();
        res.status(200).json(sites);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des sites web' });
    }
};

// Créer un nouveau site web
export const createSiteWeb = async (req, res) => {
    const { Titre, description, ProjetId } = req.body;
    try {
        const newSite = await SiteWeb.create({ Titre, description, ProjetId });
        res.status(201).json(newSite);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création du site web' });
    }
};
