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

    // Validate required fields
    if (!name) {
      return res.status(400).json({
        error: 'Name is required'
      });
    }

    // Get all users to determine the next ID
    const usersResponse = await axios.get(`${JSON_SERVER_URL}/users`);
    const users = usersResponse.data || [];
    const nextId = users.length > 0 ? Math.max(...users.map((user: User) => user.id)) + 1 : 1;

    // Create the user object
    const user: User = {
      id: nextId,
      name
    };

    // Send request to json-server
    const response = await axios.post(`${JSON_SERVER_URL}/users`, user);

    res.status(201).json(response.data);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      error: 'Failed to create user'
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Validate required fields
    if (!name) {
      return res.status(400).json({
        error: 'Name is required'
      });
    }

    // Check if user exists
    const existingUser = await axios.get(`${JSON_SERVER_URL}/users/${id}`);
    if (!existingUser.data) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user
    const updatedUser = { ...existingUser.data, name };
    const response = await axios.put(`${JSON_SERVER_URL}/users/${id}`, updatedUser);

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const existingUser = await axios.get(`${JSON_SERVER_URL}/users/${id}`);
    if (!existingUser.data) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete the user
    await axios.delete(`${JSON_SERVER_URL}/users/${id}`);
    res.status(204).send(); // 204 No Content for successful deletion
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
}; 