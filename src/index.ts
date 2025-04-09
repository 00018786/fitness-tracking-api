import express from 'express';
import routes from './routes';

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

import { Pool } from 'pg'; // PostgreSQL library
import dotenv from 'dotenv'; // Environment variable manager

dotenv.config(); // Load environment variables

// Create a connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT as unknown as number,
});

// Function to test the connection
(async () => {
  try {
    const res = await pool.query('SELECT NOW() AS "CurrentTime"');
    console.log('Database connected successfully:', res.rows[0].CurrentTime);
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
})();

// Export the pool to use it in other parts of the app
export default pool;