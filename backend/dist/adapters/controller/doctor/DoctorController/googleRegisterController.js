"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function googleRegisterController(dependencies) {
    const { googleRegisterUseCase } = dependencies.useCase;
    if (!googleRegisterUseCase) {
        throw new Error("googleRegisterUseCase is not defined in dependencies");
    }
    const googleRegisterController = async (req, res) => {
        try {
            // Extract necessary data from the request body
            const { googleId, name, email } = req.body;
            // Create an object with the necessary data
            const data = {
                googleId,
                name,
                email,
            };
            // Call the register use case with the data
            const response = await googleRegisterUseCase(dependencies).executeFunction(data);
            // Check the response from the register use case
            if (response.status) {
                res.json({ status: true });
            }
            else {
                res.json({ status: false, message: response.message });
            }
        }
        catch (error) {
            // Handle errors
            console.error("Error in Google register controller:", error);
            res.status(500).json({ status: false, message: "Internal Server Error" });
        }
    };
    return googleRegisterController;
}
exports.default = googleRegisterController;
