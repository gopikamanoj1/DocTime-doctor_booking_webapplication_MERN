"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (dependecies) => {
    const { getConvetsationIdForVideoCallUseCase } = dependecies.useCase;
    const getConvetsationIdForVideoCallController = async (req, res) => {
        try {
            const { userId, doctorId } = req.body;
            const data = {
                userId, doctorId
            };
            const response = await getConvetsationIdForVideoCallUseCase(dependecies).executeFunction(data);
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
    return getConvetsationIdForVideoCallController;
};
