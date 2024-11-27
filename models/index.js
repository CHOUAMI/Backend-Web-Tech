import sequelize from '../config/connection.js'; // Votre instance Sequelize
import User from './users.js';
import Projet from './projets.js';

// Définir les relations entre les modèles
User.hasMany(Projet, { foreignKey: 'userId', onDelete: 'CASCADE' });
Projet.belongsTo(User, { foreignKey: 'userId' });

export { sequelize, User, Projet };
