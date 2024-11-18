import { DataTypes } from "sequelize";
import database from "../config/connection.js";

// Définition du modèle pour la table Site Web
const SiteWeb = database.define('SiteWeb', {
    Titre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    ProjetId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'Projets', // Nom de la table référencée
            key: 'id'
        }
    }
}, {
    timestamps: false,
    tableName: 'siteweb' // Utilisez ici le nom correct de votre table dans la base de données
});

// Exportation du modèle
export default SiteWeb;
