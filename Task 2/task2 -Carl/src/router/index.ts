import express from 'express';
import authentication from './authentication';
import userRoutes from './users';
import taskRoutes from './task'; // Import task routes

const router = express.Router();

export default (): express.Router => {
  console.log('Registering authentication, user, and task routes...');
  
  authentication(router);  // Register authentication routes
  userRoutes(router);      // Register user routes
  taskRoutes(router);      // Register task routes
  
  console.log(
    'Registered routes:',
    router.stack.map((r) => r.route?.path) // List all paths
  );

  return router;
};
