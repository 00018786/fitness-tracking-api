import express, { RequestHandler } from 'express';
import {
  createMilestone,
  getMilestones,
  getMilestoneById,
  getMilestonesByUser,
  updateMilestone,
  deleteMilestone,
} from '../controllers/milestones';

const milestonesRouter = express.Router();

milestonesRouter.post('/', createMilestone as RequestHandler);
milestonesRouter.get('/', getMilestones as RequestHandler);
milestonesRouter.get('/:id', getMilestoneById as RequestHandler);
milestonesRouter.get('/user/:userId', getMilestonesByUser as RequestHandler);
milestonesRouter.put('/:id', updateMilestone as RequestHandler);
milestonesRouter.delete('/:id', deleteMilestone as RequestHandler);

export default milestonesRouter;
