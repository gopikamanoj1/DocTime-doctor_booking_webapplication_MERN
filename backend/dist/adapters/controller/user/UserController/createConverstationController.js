"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (dependecies) => {
    const { createConverstationUseCase } = dependecies.useCase;
    const createConverstationController = async (req, res) => {
        try {
            const { senderId, recieverId } = req.body;
            const data = {
                senderId, recieverId
            };
            const response = await createConverstationUseCase(dependecies).executeFunction(data);
            console.log(response, "contro res");
            if (response.status) {
                res.json({ status: true, data: response.data });
            }
            else {
                res.json({ status: false, data: response.data });
            }
        }
        catch (error) {
            console.error("Error in createConverstationUseCase:", error);
            res.status(500).json({ status: false, message: "Internal server error" });
        }
    };
    return createConverstationController;
};
