import { isAuthenticated } from '../middlewares';
import { createTask, getAllTasks } from '../controllers/task.controller';
import express from 'express';

export default (router: express.Router) => {
    router.get('/tasks', isAuthenticated, getAllTasks);
    router.post('/tasks', isAuthenticated, createTask);
}