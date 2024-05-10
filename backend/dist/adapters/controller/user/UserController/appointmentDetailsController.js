"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (dependecies) => {
    const { appointmentDetailsUseCase } = dependecies.useCase;
    const appointmentDetailsController = async (req, res) => {
        try {
            const { userId } = req.body;
            const data = {
                userId
            };
            const response = await appointmentDetailsUseCase(dependecies).executeFunction(data);
            console.log(response, "pppp");
            if (response && response.status && response.data) {
                res.json({ status: true, data: response.data });
            }
            else {
                res.json({ status: false, message: "Data not found" });
            }
        }
        catch (error) {
            console.log(error, "error in viewDoctorDetailsController ");
        }
    };
    return appointmentDetailsController;
};
