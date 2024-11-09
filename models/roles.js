import { DataTypes } from 'sequelize';
import database from '../config/connection.js';

const Roles = database.define('Roles', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'roles',
  timestamps: false
});

export default Roles;
