import { Router } from 'express';
import { helloWorld } from '../controllers/helloWorldController';
import { testDbConnection } from '../controllers/testDbConnection';

const router = Router();

router.get('/', helloWorld);
router.get('/test-db-connection', testDbConnection);

export default router;
