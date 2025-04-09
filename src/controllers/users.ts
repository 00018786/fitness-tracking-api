import { Request, Response } from 'express';
import axios from 'axios';

const JSON_SERVER_URL = process.env.JSON_SERVER_URL || 'http://localhost:3001';

interface User {
  id: number;
  name: string;
}

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const response = await axios.post(`${JSON_SERVER_URL}/users`, { name });
    res.status(201).json(response.data);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const userResponse = await axios.get(`${JSON_SERVER_URL}/users/${id}`);
    if (!userResponse.data) {
      return res.status(404).json({ error: 'User not found' });
    }

    const response = await axios.put(`${JSON_SERVER_URL}/users/${id}`, {
      name,
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await axios.delete(`${JSON_SERVER_URL}/users/${id}`);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
