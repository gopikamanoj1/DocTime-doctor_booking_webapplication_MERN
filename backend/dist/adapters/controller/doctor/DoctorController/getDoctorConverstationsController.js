"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (dependecies) => {
    const { getDoctorConverstationsUseCase } = dependecies.useCase;
    const getDoctorConverstationsController = async (req, res) => {
        try {
            const { id } = req.query;
            const data = {
                id
            };
            console.log(data, "data");
            const response = await getDoctorConverstationsUseCase(dependecies).executeFunction(data);
            if (response && response.status) {
                res.json({ status: true, data: response.data });
            }
            else {
                res.json({ status: false, message: "Data not found" });
            }
        }
        catch (error) {
            console.error("Error in getConverstationsUseCase:", error);
            res.status(500).json({ status: false, message: "Internal server error" });
        }
    };
    return getDoctorConverstationsController;
};
