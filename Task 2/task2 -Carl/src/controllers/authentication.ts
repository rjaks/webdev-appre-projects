// authentication controller
import { Request, Response, NextFunction } from 'express';
import { getUserByEmail, createUser, getUserById } from '../DB/users';
import { authentication, random } from '../helpers';
import { generateToken } from '../helpers';
import { verifyToken } from '../helpers';
import { merge } from 'lodash';
import { User } from '../DB/users'; // Assuming User is defined in your User model

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

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Extract email and password from the request body
    const { email, password } = req.body;
    if (!email || !password) {
      console.error('Missing credentials (email or password).');
      res.sendStatus(400); // Bad Request
      return; 
    }

    // Check if a token already exists in cookies
    const token = req.cookies['todo.auth'];
    if (token) {
      const decoded = verifyToken(token);
      if (decoded) {
        const existingUser = await getUserById(decoded.userId);
        if (!existingUser) {
          res.sendStatus(403); // Forbidden
          return; 
        }
        const newJwtToken = generateToken(existingUser._id.toString(), existingUser.role);
        res.cookie('todo.auth', newJwtToken, { httpOnly: true, domain: 'localhost', path: '/' });
        res.status(200).json({
          message: 'Login successful (token refreshed)',
          user: existingUser,
        });
        return;
      }
    }

    // If no valid token exists, proceed with user authentication via email and password
    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      console.error('No user found with the provided email');
      res.sendStatus(403); // Forbidden
      return; 
    }

    // Retrieve the salt from the user's stored authentication details
    const salt = existingUser.authentication.salt;
    console.log('Retrieved salt:', salt);  // Debugging log

    // Hash the entered password with the retrieved salt
    const hashedPassword = authentication(salt, password);
    console.log('Hashed entered password:', hashedPassword);  // Debugging log

    // Check if the hashed password matches the stored one
    if (hashedPassword !== existingUser.authentication.password) {
      console.error('Invalid password');
      console.log('Stored password hash:', existingUser.authentication.password);  // Debugging log
      res.sendStatus(403); // Forbidden
      return; 
    }

    // Password is correct, generate a new JWT token
    const newJwtToken = generateToken(existingUser._id.toString(), existingUser.role);

    // Send the new token as a cookie
    res.cookie('todo.auth', newJwtToken, { httpOnly: true, domain: 'localhost', path: '/' });

    res.status(200).json({
      message: 'Login successful',
      user: existingUser,
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.sendStatus(400); // Bad Request
  }
};





export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, username, role } = req.body;

    // Validate required fields
    if (!email || !password || !username) {
      console.error('Missing fields during registration');
      res.sendStatus(400); // Bad Request
      return;
    }

    // Validate role, if provided
    const validRoles = ['user', 'manager']; // Add any other roles you wish to support
    const userRole = validRoles.includes(role) ? role : 'user'; // Default to 'user' if role is invalid or not provided

    console.log('Checking if user already exists with email:', email);
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      console.error('User already exists:', existingUser);
      res.sendStatus(400); // Bad Request (User already exists)
      return;
    }

    console.log('Creating new user...');
    const salt = random();
    const user = await createUser({
      email,
      username,
      role: userRole, // Use the provided role or default to 'user'
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    // Generate token and set it in cookies
    const jwtToken = generateToken(user._id.toString(), user.role);
    res.cookie('todo.auth', jwtToken, { httpOnly: true, domain: 'localhost', path: '/' });

    console.log('Registration successful. Token:', jwtToken);
    res.status(200).json({ message: 'Registration successful', token: jwtToken });
    return;
  } catch (error) {
    console.error('Error during registration:', error);
    res.sendStatus(400); // Bad Request
    return; // return after response to stop further execution
  }
};
