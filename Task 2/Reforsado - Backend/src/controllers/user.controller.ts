import express from 'express';
import { UserModel } from '../models/user.model';

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({'email': email,});
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) => UserModel.findByIdAndDelete(id);
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);

export const getAllUsers = async (req: express.Request, res: express.Response) => {
  try {
    const users = await getUsers();

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
  try {
      const { id } = req.params;

      const deletedUser = await deleteUserById(id);

      res.status(200).json(deletedUser);
  } catch (error) {
      console.log(error);
      res.status(400).json({error: 'Internal server error'});
  }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params; 
    const { name } = req.body;

    if (!name){
      res.status(400).json({error: 'Invalid credentials'});
    }

    const user = await getUserById(id);
    user.name = name;
    await user.save();

    res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Internal server error'});
  }
}