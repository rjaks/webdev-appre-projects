"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Please enter a valid name."]
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    authentication: {
        password: {
            type: String,
            required: true, select: false,
        },
        salt: {
            type: String,
            select: false
        },
        sessionToken: {
            type: String,
            select: false
        }
    }
});
exports.UserModel = mongoose_1.default.model('User', UserSchema);
//# sourceMappingURL=user.model.js.map