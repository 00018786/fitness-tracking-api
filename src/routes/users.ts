import express, { RequestHandler } from 'express';
import { createUser, deleteUser, updateUser } from '../controllers/users';

const usersRouter = express.Router();

usersRouter.post('/', createUser as RequestHandler);
usersRouter.put('/:id', updateUser as RequestHandler);
usersRouter.delete('/:id', deleteUser as RequestHandler);

export default usersRouter; 