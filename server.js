import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { sequelize } from './models/index.js';
import usersRoutes from './routes/usersRoutes.js';
import projetsRoutes from './routes/projetsRoutes.js';
import logosRoutes from './routes/logosRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import jeuxRoutes from './routes/jeuxRoutes.js';
import sitewebRoutes from './routes/sitewebRoutes.js';
import rolesRoutes from './routes/rolesRoutes.js';
import auth  from './routes/auth.js';
import loginRouter from './authentification/login.js';
import verifierToken from './authentification/verifierToken.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/category', categoryRoutes);
app.use('/api/logos', logosRoutes);
app.use('/api/projets', projetsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/jeux', jeuxRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/siteweb', sitewebRoutes);
app.use('/api/auth', auth);
app.use('/api', loginRouter);

app.post('/auth/login', (req, res) => {
  // Handle login logic here
  res.status(200).json({ message: "Login successful" });
});

// Middleware to handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ message: "Resource not found" });
});

// Middleware to handle other errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

// Synchroniser la base de données
sequelize.sync({ alter: true })
  .then(() => {
    console.log("Database synced");
  })
  .catch(error => {
    console.error("Error syncing database:", error);
  });

// Démarrer le serveur en utilisant la variable `PORT`
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});