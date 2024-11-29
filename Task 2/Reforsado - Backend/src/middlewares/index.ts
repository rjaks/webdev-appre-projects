import express, { RequestHandler } from 'express'
import jwt from 'jsonwebtoken';

import { get, merge } from 'lodash';

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id }  = req.params;
        const currentUserId = get(req, 'identity._id') as string;

        if (!currentUserId) {
            res.status(403).json({ error: 'Invalid User ID'});
            return;
        }

        if (currentUserId.toString() != id) {
            res.status(403).json({ error: 'Ineligible to delete another user.'});
            return;
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({error: 'Internal session error'});
    }
}

export const isAuthenticated: RequestHandler = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try{
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            res.status(401).json({ error: 'No token received'});
            return;
        }

        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as {
                id: string;
                email: string;
                role: string;
            };

            console.log('Decoded JWT: ', decoded);
            merge(req, {identity : decoded});
            next();
        } catch (err) {
            res.status(403).json({ error: 'Token invalid' });
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({error: 'Internal server error'});
    }
}

