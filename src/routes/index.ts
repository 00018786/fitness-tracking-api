import { Router } from 'express';
import { helloWorld } from '../controllers/helloWorldController';
import milestonesRouter from './milestones';

const router = Router();

router.get('/', helloWorld);
router.use('/milestones', milestonesRouter);

export default router;
