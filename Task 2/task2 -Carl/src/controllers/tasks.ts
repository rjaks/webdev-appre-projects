// taskcontroller.ts
import { Request, Response } from 'express';
import {Task} from '../DB/task';  // Import your Task model
declare global {
  namespace Express {
    interface Request {
      identity?: {
        _id: string;
        username: string;
        email: string;
        role: string;
      };
    }
  }
}
export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.identity?._id) {
      res.status(403).json({ message: 'Forbidden: User is not authenticated.' });
      return;
    }

    const { title, description, dueDate } = req.body;

    const task = new Task({
      title,
      description,
      completed: false,
      dueDate,
      userId: req.identity._id, // Use the authenticated user's ID
    });

    await task.save();
    res.status(201).json(task); // Return the created task
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error creating task', error });
  }
};



export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.identity?._id) {
      res.status(403).json({ message: 'Forbidden: User is not authenticated.' });
      return;
    }

    const userId = req.identity._id; // Get the user's ID from req.identity
    const tasks = await Task.find({ userId }); // Query tasks for this user

    res.status(200).json(tasks); // Return the tasks
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(400).json({ message: 'Error fetching tasks', error });
  }
};



export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, completed } = req.body;

    const task = await Task.findById(id);
    if (!task) {
     res.sendStatus(404);
     return;
    }

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.dueDate = dueDate ?? task.dueDate;
    task.completed = completed ?? task.completed;

    await task.save();
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.identity?._id; // Ensure `identity` is available

    if (!userId) {
      res.status(403).json({ message: 'Forbidden: User not authenticated.' });
      return;
    }

    const task = await Task.findOne({ _id: id, userId }); // Check ownership
    if (!task) {
      res.status(404).json({ message: 'Task not found or access denied.' });
      return;
    }

    await Task.deleteOne({ _id: id });
    res.status(200).json({ message: 'Task deleted successfully.' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(400).json({ message: 'Error deleting task.', error });
  }
};






