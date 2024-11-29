import express from 'express';
import { get } from 'lodash';
import { TaskModel } from '../models/task.model';

export const getAllTasks = async (req: express.Request, res: express.Response) => {
    try {
        // issue: missing authentications (cant find id apparently)
        // tried lodash get() and global declarations but they cant seem to retrieve the identity id

        console.log("Request Object:", req);
        const userId = get(req, 'identity._id');
        console.log("User ID from Request:", userId);

        if (!userId) {
            res.status(403).json({error: 'User is not authenticated'});
            return;
        }

        const tasks = await TaskModel.find({userId});

        res.status(200).json(tasks);
    } catch(error) {
        console.log(error);
        res.status(500).json({error: 'Internal server error'});
    }
}

export const createTask = async (req: express.Request, res: express.Response) => {
    try {
        // issue: missing authentications
        const userId = get(req, 'identity._id');

        if (!userId) {
            res.status(403).json({error: 'User is not authenticated'});
            return;
        }

        const { title, dueDate, description } = req.body;

        if (!title || !dueDate) {
            res.status(400).json({error: 'Invalid/insufficient credentials'});
            return;
        }

        const newTask =  new TaskModel({
            title,
            description,
            dueDate,
            userId
        })

        const task = await newTask.save();

        res.status(201).json(task);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server error'});
        return;
    }
}