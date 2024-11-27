import { Router } from 'express';
import { isAuthenticated, isManager, isWorker } from '../middleware';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/tasks';

const taskRoutes = (router: Router): void => {
  // Task routes
  router.post('/tasks', isAuthenticated, createTask); // Worker can create tasks (POST)
  router.get('/tasks', isAuthenticated, getTasks); // Worker can view tasks (GET)

  // Manager-specific routes
  router.put('/tasks/:id', isAuthenticated, isManager, updateTask); // Manager can update tasks (PUT)
  router.delete('/tasks/:id', isAuthenticated, isManager, deleteTask); // Manager can delete tasks (DELETE)
};
7610579683
export default taskRoutes;
