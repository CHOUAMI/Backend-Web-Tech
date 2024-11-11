import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/connection.js';
import usersRoutes from './routes/usersRoutes.js';
import projetsRoutes from './routes/projetsRoutes.js';
import logosRoutes from './routes/logosRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import jeuxRoutes from  './routes/jeuxRoutes.js';


dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/category', categoryRoutes);
app.use('/api/logos', logosRoutes);
app.use('/api/projets',projetsRoutes);
app.use('/api/users',usersRoutes);
app.use('/api/jeux',jeuxRoutes);
// Déclaration de la fonction initDatabase avant de l'appeler

// Synchroniser la base de données
sequelize.sync({alter:true})
.then(() => {
  console.log("Database synced");
})
.catch(error => {
  console.error("Error syncing database:", error);
});

// Démarrer le serveur en utilisant la variable `PORT`
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});