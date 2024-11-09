import { DataTypes } from 'sequelize';
import database from '../config/connection.js';

const Jeux = database.define('Jeux', {
  titre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  projetId: {
    type: DataTypes.BIGINT,
    allowNull: true
  }
}, {
  timestamps: false
});

export default Jeux;
