"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (dependecies) => {
    const { doctorLogoutUseCase } = dependecies.useCase;
    const doctorLogoutController = async (req, res) => {
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
    };
    return doctorLogoutController;
};
