import { DataTypes } from 'sequelize';
import sequelize from '../config/connection.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  motDePasse: {
    type: DataTypes.STRING,
    allowNull: false
  },
  RoleId: { // Correspond à la base de données
    type: DataTypes.BIGINT,
    allowNull: true
  }
}, {
  tableName: 'users',
  timestamps: false
});

export default User;
