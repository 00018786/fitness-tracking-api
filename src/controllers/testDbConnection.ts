import { pool } from "../db/db-provider";
import { Request, Response } from "express";
export const testDbConnection = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT NOW() AS "CurrentTime"');
        res.status(200).json({
        message: 'Database connected successfully',
        currentTime: result.rows[0].CurrentTime,
        });
    } catch (error) {
        res.status(500).json({
        message: 'Error connecting to the database',
        error: error,
        });
    }
}