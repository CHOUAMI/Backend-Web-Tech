import { Router } from 'express';
import { getUsers, createUser } from '../controllers/usersController.js';

const usersRoutes = Router();

usersRoutes.get('/', getUsers);
usersRoutes.post('/', createUser);

export default usersRoutes;
