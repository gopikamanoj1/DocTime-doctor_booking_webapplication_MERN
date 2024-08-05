"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (dependecies) => {
    const { doctorLogoutUseCase } = dependecies.useCase;
    const doctorLogoutController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Assuming you're using express-session for session management
            if (req.session) {
                // Destroy the session to log the user out
                req.session.destroy((err) => {
                    if (err) {
                        console.error("Error destroying session:", err);
                        res.status(500).json({ status: false, message: "Internal Server Error" });
                    }
                    else {
                        // Successful logout
                        res.json({ status: true, message: "Logout successful" });
                    }
                });
            }
            else {
                // No session found, consider the user already logged out
                res.json({ status: true, message: "User already logged out" });
            }
        }
        catch (error) {
            console.error("Error during logout:", error);
            res.status(500).json({ status: false, message: "Internal Server Error" });
        }
    });
    return doctorLogoutController;
};
