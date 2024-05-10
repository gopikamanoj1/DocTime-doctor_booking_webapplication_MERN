"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const AutheticationRouter_1 = __importDefault(require("./AutheticationRouter"));
const express_1 = __importDefault(require("express"));
const routes = (dependencies) => {
    const routes = express_1.default.Router();
    routes.use('/auth', (0, AutheticationRouter_1.default)(dependencies));
    return routes;
};
exports.routes = routes;
