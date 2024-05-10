"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (dependencies) => {
    const { getAllAppoinmentsUseCase } = dependencies.useCase;
    const getAllAppoinmentsController = async (req, res) => {
        try {
            const response = await getAllAppoinmentsUseCase(dependencies).executeFunction();
            console.log();
            if (response && response.status && response.data) {
                res.json({ status: true, data: response.data });
            }
            else {
                res.json({ status: false, message: "Data not found" });
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    return getAllAppoinmentsController;
};
