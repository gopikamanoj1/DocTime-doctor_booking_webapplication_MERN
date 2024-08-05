"use strict";
// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const generateToken_1 = require("../generateToken");
// Middleware to verify JWT tokens
const authMiddleware = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(' ')[1]; // Extract Bearer token
    if (!token) {
        return res.status(401).json({ status: false, message: 'No token provided' });
    }
    try {
        const decoded = (0, generateToken_1.verifyToken)(token); // Verify the JWT token
        req.session = decoded.userId; // Store the user ID in the request object
        next(); // Proceed to the next middleware or route handler
    }
    catch (error) {
        return res.status(401).json({ status: false, message: 'Invalid or expired token' });
    }
};
exports.authMiddleware = authMiddleware;
