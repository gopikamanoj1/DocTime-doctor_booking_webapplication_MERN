"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../../utils");
exports.default = (dependencies) => {
    const { registerUseCase } = dependencies.useCase;
    const registerController = async (req, res) => {
        try {
            // Extract necessary data from the request body
            const { name, email, password } = req.body;
            // Hash the password
            const hashedPassword = await (0, utils_1.hashPassword)(password);
            const data = {
                name,
                email,
                password: hashedPassword,
            };
            req.session.userData = data;
            // Call the register use case
            const response = await registerUseCase(dependencies).executeFunction(data);
            console.log(response, "response");
            if (response.status) {
                req.session.Otp = response.data;
                res.json({ status: true, data: response.data });
            }
            else {
                res.json({ status: false, data: response.data });
            }
            if (response.status === false) {
                console.log("User already exists:", response.data);
            }
        }
        catch (error) {
            console.error("Error in register controller:", error);
            res.status(500).json({ status: false, message: "Internal Server Error" });
        }
    };
    return registerController;
};
