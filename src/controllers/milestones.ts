import { Request, Response } from 'express';
import axios from 'axios';

const JSON_SERVER_URL = process.env.JSON_SERVER_URL || 'http://localhost:3001';

interface Milestone {
  id: number;
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

    if (!userId || !title || !date || !type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const milestonesResponse = await axios.get(`${JSON_SERVER_URL}/milestones`);
    const milestones = milestonesResponse.data || [];
    const nextId = milestones.length > 0 ? Math.max(...milestones.map((m: any) => m.id)) + 1 : 1;

    const response = await axios.post(`${JSON_SERVER_URL}/milestones`, {
      id: nextId,
      userId,
      title,
      description,
      date,
      type,
      achieved: achieved || false
    });

    res.status(201).json(response.data);
  } catch (error) {
    console.error('Error creating milestone:', error);
    res.status(500).json({ error: 'Failed to create milestone' });
  }
};

export const getMilestones = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${JSON_SERVER_URL}/milestones`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error getting milestones:', error);
    res.status(500).json({ error: 'Failed to get milestones' });
  }
};

export const getMilestoneById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${JSON_SERVER_URL}/milestones/${id}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error getting milestone:', error);
    res.status(500).json({ error: 'Failed to get milestone' });
  }
};

export const getMilestonesByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const response = await axios.get(
      `${JSON_SERVER_URL}/milestones?userId=${userId}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error getting user milestones:', error);
    res.status(500).json({ error: 'Failed to get user milestones' });
  }
};

export const updateMilestone = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, date, type, achieved } = req.body;

    const milestoneResponse = await axios.get(
      `${JSON_SERVER_URL}/milestones/${id}`
    );
    if (!milestoneResponse.data) {
      return res.status(404).json({ error: 'Milestone not found' });
    }

    const updatedMilestone = {
      ...milestoneResponse.data,
      title: title || milestoneResponse.data.title,
      description: description || milestoneResponse.data.description,
      date: date || milestoneResponse.data.date,
      type: type || milestoneResponse.data.type,
      achieved:
        achieved !== undefined ? achieved : milestoneResponse.data.achieved,
    };

    const response = await axios.put(
      `${JSON_SERVER_URL}/milestones/${id}`,
      updatedMilestone
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error updating milestone:', error);
    res.status(500).json({ error: 'Failed to update milestone' });
  }
};

export const deleteMilestone = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await axios.delete(`${JSON_SERVER_URL}/milestones/${id}`);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting milestone:', error);
    res.status(500).json({ error: 'Failed to delete milestone' });
  }
};
