"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (dependecies) => {
    const { getDoctorConverstationByIdUseCase } = dependecies.useCase;
    const getDoctorConverstationByIdController = async (req, res) => {
        try {
            const { id } = req.query;
            const data = {
                id
            };
            const response = await getDoctorConverstationByIdUseCase(dependecies).executeFunction(data);
            if (response && response.status && response.data) {
                res.json({ status: true, data: response.data });
            }
            else {
                res.json({ status: false, message: response.data });
            }
        }
        catch (error) {
            console.log(error, "error in viewDoctorDetailsController ");
        }
    };
    return getDoctorConverstationByIdController;
};
