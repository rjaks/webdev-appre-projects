import express from 'express';
import { getAllUsers, deleteUser, updateUser } from '../controllers/user.controller';
import { isAuthenticated, isOwner } from '../middlewares';
import { update } from 'lodash';

export default (router: express.Router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
    router.patch('/users/:id', isAuthenticated, isOwner, updateUser);
};