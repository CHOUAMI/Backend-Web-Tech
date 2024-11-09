import { DataTypes } from 'sequelize';
import sequelize from '../config/connection.js';
import User from './users.js';

const Projet = sequelize.define('Projet', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  titre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  userId: {
    type: DataTypes.BIGINT, // Assurez-vous que ce type correspond à celui du champ 'id' dans 'users'
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
}, {
  tableName: 'projets',
  timestamps: false
});

// Définir la relation
Projet.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

export default Projet;
