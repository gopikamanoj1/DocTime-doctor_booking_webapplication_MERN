"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    port: process.env.PORT || 3000,
    mongo: {
        uri: 'mongodb+srv://gopikamanoj001:Gopika%40123@doctime.eyvgrkj.mongodb.net/doctime?retryWrites=true&w=majority&appName=doctime',
    },
};
