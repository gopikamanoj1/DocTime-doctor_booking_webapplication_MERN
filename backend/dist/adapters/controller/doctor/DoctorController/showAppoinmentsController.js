"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (dependecies) => {
    const { showAppoinmentsUseCase } = dependecies.useCase;
    const showAppoinmentsController = async (req, res) => {
        try {
            const { doctorId } = req.body;
            const data = {
                doctorId
            };
            const response = await showAppoinmentsUseCase(dependecies).executeFunction(data);
            console.log(response, "data cc");
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
    return showAppoinmentsController;
};
