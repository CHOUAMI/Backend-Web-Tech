import { Router } from 'express';
import { getUsers, createUser } from '../controllers/usersController.js';
import { login } from '../authentification/login.js';
const usersRoutes = Router();

usersRoutes.get('/', getUsers);
usersRoutes.post('/', createUser);
usersRoutes.post('/login', login);
export default usersRoutes;
