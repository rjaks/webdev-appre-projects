
//middleware
import { RequestHandler } from 'express';
import { get, merge } from 'lodash';
import { getUserById } from '../DB/users';
import { verifyToken } from '../helpers';
import { Request, Response, NextFunction } from 'express';

declare global {
    namespace Express {
      interface Request {
        identity?: {
          _id: string;
          username: string;
          email: string;
          role: string;
          // Add any other properties as needed
        };
      }
    }
  }
export const isOwner: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, 'identity._id') as string | undefined;

        if (!currentUserId) {
            res.sendStatus(403); // Forbidden
            return;
        }

        if (currentUserId.toString() !== id) {
            res.sendStatus(403); // Forbidden
            return;
        }

        next();
    } catch (error) {
        console.error(error);
        res.sendStatus(400); // Bad Request
    }
};


  
export const isAuthenticated: RequestHandler = async (req, res, next) => {
  try {
    const token = req.cookies?.['todo.auth']; // Retrieve token from cookies
    if (!token) {
      res.status(401).json({ message: 'Access denied. Token is missing.' });
      return;
    }

    const decoded = verifyToken(token); // Verify and decode the token
    if (!decoded || typeof decoded !== 'object' || !('userId' in decoded)) {
      res.status(401).json({ message: 'Access denied. Invalid token.' });
      return;
    }

    const existingUser = await getUserById(decoded.userId); // Fetch user
    if (!existingUser) {
      res.status(401).json({ message: 'Access denied. User does not exist.' });
      return;
    }

    req.identity = {
      _id: existingUser._id.toString(),
      username: existingUser.username,
      email: existingUser.email,
      role: existingUser.role,
    };

    next();
  } catch (error) {
    console.error('Error in isAuthenticated middleware:', error);
    res.status(400).json({ message: 'Bad Request. Middleware error occurred.' });
  }
};



  
export const isManager: RequestHandler = (req, res, next) => {
  console.log('Identity:', req.identity); // Log identity object

  if (!req.identity || req.identity.role !== 'manager') {
    console.log('User is not a manager');
    res.status(403).json({ message: 'Forbidden: User is not a manager.' });
    return;
  }

  next();
};

  export const isWorker: RequestHandler = (req, res, next) => {
    console.log('User Role in isWorker:', req.identity?.role); // Debugging
  
    if (req.identity?.role !== 'worker') {
      res.status(403).json({ message: 'Access denied. Not a worker.' });
      return;
    }
  
    next();
  };
  