import express, { RequestHandler } from 'express';
import { createUser, deleteUser, updateUser, getUsers, getUserName } from '../controllers/users';

const usersRouter = express.Router();

usersRouter.get('/', getUsers as RequestHandler);
usersRouter.get('/:id', getUserName as RequestHandler);
usersRouter.post('/', createUser as RequestHandler);
usersRouter.put('/:id', updateUser as RequestHandler);
usersRouter.delete('/:id', deleteUser as RequestHandler);

export default usersRouter;
