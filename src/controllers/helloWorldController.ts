import { Request, Response } from 'express';

export function helloWorld(req: Request, res: Response): void {
  res.status(200).json({ message: 'Hello World!' });
}