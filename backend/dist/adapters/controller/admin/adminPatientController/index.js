"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminUserController_1 = __importDefault(require("./adminUserController"));
const handleUserBlockController_1 = __importDefault(require("./handleUserBlockController"));
exports.default = (dependencies) => {
    return {
        adminUserController: (0, adminUserController_1.default)(dependencies),
        handleUserBlockController: (0, handleUserBlockController_1.default)(dependencies),
    };
};
