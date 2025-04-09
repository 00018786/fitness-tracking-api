import { Request, Response } from 'express';
import axios from 'axios';

const JSON_SERVER_URL = process.env.JSON_SERVER_URL || 'http://localhost:3001';

interface Milestone {
  userId: number;
  title: string;
  description: string;
  date: string;
  type: string;
  achieved: boolean;
}

export const createMilestone = async (req: Request, res: Response) => {
  try {
    const { userId, title, description, date, type, achieved } = req.body;

    // Validate required fields
    if (!userId || !title || !date || !type) {
      return res.status(400).json({
        error: 'Missing required fields: userId, title, date, and type are required'
      });
    }

    // Create the milestone object
    const milestone: Milestone = {
      userId,
      title,
      description: description || '',
      date,
      type,
      achieved: achieved || false
    };

    // Send request to json-server
    const response = await axios.post(`${JSON_SERVER_URL}/milestones`, milestone);

    res.status(201).json(response.data);
  } catch (error) {
    console.error('Error creating milestone:', error);
    res.status(500).json({
      error: 'Failed to create milestone'
    });
  }
};

export const updateMilestone = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, date, type, achieved } = req.body;

    // Check if milestone exists
    const existingMilestone = await axios.get(`${JSON_SERVER_URL}/milestones/${id}`);
    if (!existingMilestone.data) {
      return res.status(404).json({ error: 'Milestone not found' });
    }

    // Update only provided fields
    const updatedMilestone = {
      ...existingMilestone.data,
      ...(title && { title }),
      ...(description !== undefined && { description }),
      ...(date && { date }),
      ...(type && { type }),
      ...(achieved !== undefined && { achieved })
    };

    const response = await axios.put(`${JSON_SERVER_URL}/milestones/${id}`, updatedMilestone);
    res.json(response.data);
  } catch (error) {
    console.error('Error updating milestone:', error);
    res.status(500).json({ error: 'Failed to update milestone' });
  }
};

export const getMilestone = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${JSON_SERVER_URL}/milestones/${id}`);
    
    if (!response.data) {
      return res.status(404).json({ error: 'Milestone not found' });
    }

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching milestone:', error);
    res.status(500).json({ error: 'Failed to fetch milestone' });
  }
};

export const getAllMilestones = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${JSON_SERVER_URL}/milestones`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching milestones:', error);
    res.status(500).json({ error: 'Failed to fetch milestones' });
  }
};

export const deleteMilestone = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if milestone exists
    const existingMilestone = await axios.get(`${JSON_SERVER_URL}/milestones/${id}`);
    if (!existingMilestone.data) {
      return res.status(404).json({ error: 'Milestone not found' });
    }

    // Delete the milestone
    await axios.delete(`${JSON_SERVER_URL}/milestones/${id}`);
    res.status(204).send(); // 204 No Content for successful deletion
  } catch (error) {
    console.error('Error deleting milestone:', error);
    res.status(500).json({ error: 'Failed to delete milestone' });
  }
};

export const getMilestonesByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const response = await axios.get(`${JSON_SERVER_URL}/milestones?userId=${userId}`);
    
    if (!response.data || response.data.length === 0) {
      return res.status(404).json({ error: 'No milestones found for this user' });
    }

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching user milestones:', error);
    res.status(500).json({ error: 'Failed to fetch user milestones' });
  }
}; 