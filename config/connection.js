import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Initialisation de Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT,
});

// Vérification et ajout de la colonne 'projetId'
const checkAndAddColumn = async () => {
  const queryInterface = sequelize.getQueryInterface();

  try {
    // Récupérer la structure de la table Logos
    const tableInfo = await queryInterface.describeTable('Logos');

    // Vérifier si la colonne projetId existe
    if (!tableInfo.projetId) {
      // Ajouter la colonne avec les relations nécessaires
      await queryInterface.addColumn('Logos', 'projetId', {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: 'projets', // Nom de la table cible
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      console.log('Colonne projetId ajoutée avec succès');
    } else {
      console.log('La colonne projetId existe déjà');

      // Vérifiez les contraintes existantes
      const constraints = await sequelize.query(`
        SELECT CONSTRAINT_NAME
        FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
        WHERE TABLE_NAME = 'Logos' AND COLUMN_NAME = 'projetId'
        AND CONSTRAINT_NAME IS NOT NULL;
      `, { type: sequelize.QueryTypes.SELECT });

      if (!constraints.length) {
        // Ajouter la contrainte manquante
        await queryInterface.addConstraint('Logos', {
          fields: ['projetId'],
          type: 'foreign key',
          name: 'Logos_projetId_foreign_idx',
          references: {
            table: 'projets',
            field: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        });
        console.log('Contrainte ajoutée avec succès');
      } else {
        console.log('La contrainte existe déjà');
      }
    }
  } catch (error) {
    console.error("Erreur lors de la vérification ou de l'ajout de la colonne :", error.message);
  }
};

// Fonction pour connecter à la base de données
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Vérification de la colonne et ajout si nécessaire
    await checkAndAddColumn();
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
    process.exit(1); // Quitte le processus en cas d'erreur critique
  }
};

// Connecter la base de données
connectDB();

export default sequelize;
