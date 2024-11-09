import { DataTypes } from 'sequelize';
import sequelize from '../config/connection.js';
import Projet from './projets.js';

const Logos = sequelize.define('Logos', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  logoUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  projetId: {
    type: DataTypes.BIGINT,
    references: {
      model: Projet,
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
}, {
  tableName: 'Logos',
  timestamps: false
});

Logos.belongsTo(Projet, { foreignKey: 'projetId', onDelete: 'CASCADE' });
Projet.hasMany(Logos, { foreignKey: 'projetId' });

export default Logos;
