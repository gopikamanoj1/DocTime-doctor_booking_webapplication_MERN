"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getAllAppoinmentsController_1 = __importDefault(require("./getAllAppoinmentsController"));
exports.default = (dependencies) => {
    return {
        getAllAppoinmentsController: (0, getAllAppoinmentsController_1.default)(dependencies)
    };
};
