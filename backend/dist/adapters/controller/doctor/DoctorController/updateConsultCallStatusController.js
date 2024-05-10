"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (dependecies) => {
    const { updateConsultCallStatusUseCase } = dependecies.useCase;
    const updateConsultCallStatusController = async (req, res) => {
        try {
            const { appoinmentId } = req.body;
            console.log(req.body, 'Body');
            const data = {
                appoinmentId
            };
            const response = await updateConsultCallStatusUseCase(dependecies).executeFunction(data);
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
    return updateConsultCallStatusController;
};
