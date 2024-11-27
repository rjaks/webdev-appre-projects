"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const authentication_1 = __importDefault(require("./authentication"));
exports.router = express_1.default.Router();
exports.default = () => {
    (0, authentication_1.default)(exports.router);
    return exports.router;
};
//# sourceMappingURL=index.js.map