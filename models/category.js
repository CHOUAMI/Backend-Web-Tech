import { DataTypes } from "sequelize";
import database from "../config/connection.js";

// Définition du modèle
const Category = database.define('Category', {
    nom: { type: DataTypes.STRING, 
        allowNull: false
     },
    description: {
        type: DataTypes.TEXT,
         allowNull: true 
    }
},{
    timestamps: false,
     tableName: 'category'// Utilisez ici 'categories' ou le nom de la table approprié
  });

// Exportation du modèle
export default Category;
