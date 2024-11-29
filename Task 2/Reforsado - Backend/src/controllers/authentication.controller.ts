import express, { RequestHandler } from 'express';
import { createUser, getUserByEmail } from '../controllers/user.controller';
import { authentication, random } from '../helpers';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const register: RequestHandler = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { name, email, role, password } = req.body;

        if (!email || !password || !name || !role){
            res.status(400).json({error: 'Missing required fields'});
            return;
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            res.status(400).json({error: 'User already exists'});
            return;
        }   

        const salt = random();
        const user = await createUser({
            name,
            email,
            role,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });

        res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        res.status(400).json({error: 'Internal server error'});
        return;
    }
}

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password ) {
            res.status(400).json({error: 'Missing email or password'});
            return;
        }

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

        if (!user) {
            res.status(400).json({error: 'User not found'});
            return;
        }

        const expectedHash = authentication(user.authentication.salt, password);
        if (user.authentication.password != expectedHash) {
            res.status(403).json({error: 'Incorrect password'});
            return;
        }
        
        const accessToken = jwt.sign(
            { _id: user._id, email: user.email, role: user.role },
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: '1h' }
        );
        res.status(200).json({ accessToken });

    } catch (error) {
        console.log(error);
        res.status(400).json({error: 'Internal server error'});
        return;
    }
}