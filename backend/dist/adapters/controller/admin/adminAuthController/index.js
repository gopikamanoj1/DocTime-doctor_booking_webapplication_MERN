"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminLoginContoller_1 = __importDefault(require("./adminLoginContoller"));
const adminLogoutController_1 = __importDefault(require("./adminLogoutController"));
exports.default = (dependencies) => {
    return {
        adminLoginController: (0, adminLoginContoller_1.default)(dependencies),
        adminLogoutController: (0, adminLogoutController_1.default)(dependencies)
    };
};
