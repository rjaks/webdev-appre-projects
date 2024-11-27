import { Request, Response, RequestHandler } from 'express';
import { getUserById, getUsers, deleteUserById } from '../DB/users'; // Import DB functions
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
// Get all users (Admin route, for example)
export const getAllUsers: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getUsers(); // Fetch all users
    res.status(200).json(users); // Return users
  } catch (error) {
    console.error(error);
    res.sendStatus(400); // Bad request if there's an error
  }
};

// Delete a user by ID (Admin route, for example)
export const deleteUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params; // Get user ID from params
    const deletedUser = await deleteUserById(id); // Delete user from DB
    res.status(200).json(deletedUser); // Return the deleted user
  } catch (error) {
    console.error(error);
    res.sendStatus(400); // Bad request if there's an error
  }
};

// Update user information
export const updateUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params; // Get user ID from params
    const { username, email, role } = req.body; // Get new values from request body

    // Get the user by ID and update fields
    const user = await getUserById(id);

    if (!user) {
      res.sendStatus(404); // Not Found
      return;
    }

    // Update the fields
    if (username) user.username = username;
    if (email) user.email = email;
    if (role) user.role = role;

    await user.save(); // Save the updated user
    res.status(200).json(user); // Return updated user
  } catch (error) {
    console.error(error);
    res.sendStatus(400); // Bad request if there's an error
  }
};

// Get the user's profile
export const getUserProfile: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.identity; // Access the authenticated user from the middleware (req.identity)
    
    if (!user) {
      res.status(401).send('User not authenticated'); // Unauthorized if user doesn't exist
      return;
    }

    // Return user profile (can add more fields as needed)
    res.status(200).json({
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500); // Internal server error if something goes wrong
  }
};
