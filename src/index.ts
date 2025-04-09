import express from 'express';
import usersRouter from './routes/users';
import milestonesRouter from './routes/milestones';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);
app.use('/milestones', milestonesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
