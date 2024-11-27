"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserById = exports.deleteUserById = exports.createUser = exports.getUserBySessionToken = exports.getUserById = exports.getUserByEmail = void 0;
const user_model_1 = require("../models/user.model");
class UserController {
    getAllUser = async (req, res) => {
        try {
            const users = await user_model_1.UserModel.find();
            res.status(200).json({ data: users });
        }
        catch (err) {
            res.sendStatus(400);
        }
    };
    getUser = async (req, res) => {
        try {
            const { id } = req.params;
            const user = await user_model_1.UserModel.findById(id);
            res.status(200).json({ data: user });
        }
        catch (err) {
            res.sendStatus(400);
        }
    };
    createUser = async (req, res) => {
        try {
            const { name, role } = req.body;
            const user = new user_model_1.UserModel({
                name,
                role,
            });
            await user.save();
            res.status(201).json({ message: "User Created.", data: user });
        }
        catch (err) {
            res.sendStatus(400);
        }
    };
    updateUser = async (req, res) => {
        try {
            const { id } = req.params;
            const { name, role } = req.body;
            const user = await user_model_1.UserModel.findById(id);
            if (user) {
                user.name = name;
                user.role = role;
                await user.save();
                res.status(200).json({ message: "User Updated.", data: user });
            }
            res.sendStatus(400);
        }
        catch (err) {
            res.sendStatus(400);
        }
    };
    deleteUser = async (req, res) => {
        try {
            const { id } = req.params;
            await user_model_1.UserModel.findByIdAndDelete({ _id: id });
            res.status(200).json({ message: "User deleted." });
        }
        catch (err) {
            res.sendStatus(400);
        }
    };
}
exports.default = new UserController();
const getUserByEmail = (email) => user_model_1.UserModel.findOne({ 'email': email, });
exports.getUserByEmail = getUserByEmail;
const getUserById = (id) => user_model_1.UserModel.findById(id);
exports.getUserById = getUserById;
const getUserBySessionToken = (sessionToken) => user_model_1.UserModel.findOne({ 'authentication.sessionToken': sessionToken, });
exports.getUserBySessionToken = getUserBySessionToken;
const createUser = (values) => new user_model_1.UserModel(values).save().then((user) => user.toObject());
exports.createUser = createUser;
const deleteUserById = (id) => user_model_1.UserModel.findByIdAndDelete(id);
exports.deleteUserById = deleteUserById;
const updateUserById = (id, values) => user_model_1.UserModel.findByIdAndUpdate(id, values);
exports.updateUserById = updateUserById;
//# sourceMappingURL=user.controller.js.map