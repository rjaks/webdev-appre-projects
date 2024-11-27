import { Request, RequestHandler, Response } from "express";
import { UserModel } from "../models/user.model";

class UserController {
  getAllUser: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const users = await UserModel.find();
      res.status(200).json({ data: users });
    } catch (err) {
      res.sendStatus(400);
    }
  };

  getUser: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const user = await UserModel.findById(id);
      res.status(200).json({ data: user });
    } catch (err) {
      res.sendStatus(400);
    }
  };

  createUser: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { name, role } = req.body;
      const user = new UserModel({
        name,
        role,
      });
      await user.save();
      res.status(201).json({ message: "User Created.", data: user });
    } catch (err) {
      res.sendStatus(400);
    }
  };

  updateUser: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const { name, role } = req.body;
      const user = await UserModel.findById(id);
      if (user) {
        user.name = name;
        user.role = role;
        await user.save();
        res.status(200).json({ message: "User Updated.", data: user });
      }
      res.sendStatus(400);
    } catch (err) {
      res.sendStatus(400);
    }
  };

  deleteUser: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
      await UserModel.findByIdAndDelete({ _id: id });
      res.status(200).json({ message: "User deleted." });
    } catch (err) {
      res.sendStatus(400);
    }
  };
}

export default new UserController();

export const getUserByEmail = (email: string) => UserModel.findOne({'email': email,});
export const getUserById = (id: string) => UserModel.findById(id);
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({'authentication.sessionToken': sessionToken,});
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) => UserModel.findByIdAndDelete(id);
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);