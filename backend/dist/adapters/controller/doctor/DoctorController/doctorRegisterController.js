"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../../utils");
exports.default = (dependencies) => {
    const { doctorRegisterUseCase } = dependencies.useCase;
    if (!doctorRegisterUseCase) {
        throw new Error("doctorRegisterUseCase is not defined in dependencies");
    }
    const doctorRegisterController = async (req, res) => {
        try {
            // Extract necessary data from the request body
            const { name, email, password } = req.body;
            // Hash the password
            const hashedPassword = await (0, utils_1.hashPassword)(password);
            // Create an object with the necessary data
            const data = {
                name,
                email,
                password: hashedPassword, // Use the hashed password
            };
            // Store the data object in the session
            req.session.doctorData = data;
            // Output the stored session data for debugging
            console.log(req.session.doctorData, "Stored doctor data in session");
            // Call the register use case with the data
            const response = await doctorRegisterUseCase(dependencies).executeFunction(data);
            // Check the response from the register use case
            if (response.status) {
                // If successful, store additional data in the session
                req.session.Otp = response.data;
                res.json({ status: true });
            }
            else {
                // If unsuccessful, respond with an error message
                res.json({ status: false, message: response.message });
            }
        }
        catch (error) {
            // Handle errors
            console.error("Error in register controller:", error);
            res.status(500).json({ status: false, message: "Internal Server Error" });
        }
    };
    return doctorRegisterController;
};
