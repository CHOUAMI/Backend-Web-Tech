// Importer le module de connexion
import { Sequelize } from "sequelize"

//Importer les variables de connexion
import dotenv from 'dotenv'
dotenv.config();
const ENV = process.env;

//const connection = new Sequelize(ENV.DB_NAME, ENV.DB_USER, ENV.DB_PASSWORD, {
 //   host: ENV.DB_HOST,
 //   dialect: ENV.DB_DIALECT,
  //   port:ENV.DB_PORT
//})
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT
  });

  const connectDB = async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  };
  
  connectDB();
  
  export default sequelize;