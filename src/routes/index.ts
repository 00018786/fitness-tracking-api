import { Router } from 'express';
import { helloWorld } from '../controllers/helloWorldController';
import milestonesRouter from './milestones';
import usersRouter from './users';

const router = Router();

router.get('/', helloWorld);
router.use('/milestones', milestonesRouter);
router.use('/users', usersRouter);

export default router;
