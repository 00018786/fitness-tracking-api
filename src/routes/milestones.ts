import express, { RequestHandler } from 'express';
import { createMilestone, updateMilestone, getMilestone, getAllMilestones } from '../controllers/milestones';

const milestonesRouter = express.Router();

milestonesRouter.post('/', createMilestone as RequestHandler);
milestonesRouter.put('/:id', updateMilestone as RequestHandler);
milestonesRouter.get('/:id', getMilestone as RequestHandler);
milestonesRouter.get('/', getAllMilestones as RequestHandler);

export default milestonesRouter; 