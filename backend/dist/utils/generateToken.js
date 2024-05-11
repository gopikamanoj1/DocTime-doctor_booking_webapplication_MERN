"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = ({ userId }) => {
    const token = jsonwebtoken_1.default.sign({ userId }, "abc@123", {
        expiresIn: '30d',
    });
    return { token };
};
exports.default = generateToken;
// Function to verify a JWT token and return the decoded payload
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, "abc@123");
};
exports.verifyToken = verifyToken;
// import jwt from 'jsonwebtoken';
// interface GenerateTokensOptions {
//  userId: string;
// }
// const generateTokens = ({ userId }: GenerateTokensOptions): { accessToken: string, refreshToken: string } => {
//  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
//     expiresIn: '15m', // Access token expires in 15 minutes
//  });
//  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET as string, {
//     expiresIn: '7d', // Refresh token expires in 7 days
//  });
//  return { accessToken, refreshToken };
// };
// export default generateTokens;
