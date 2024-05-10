"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (dependecies) => {
    const { downloadPrescriptionUseCase } = dependecies.useCase;
    const downloadPrescriptionController = async (req, res) => {
        try {
            const { appoinmentId } = req.body;
            const data = {
                appoinmentId
            };
            const response = await downloadPrescriptionUseCase(dependecies).executeFunction(data);
            if (response && response.status && response.data) {
                res.json({ status: true, data: response.data });
            }
            else {
                res.json({ status: false, message: "Data not found" });
            }
        }
        catch (error) {
            console.log(error, "error in downloadPrescriptionUseCase ");
        }
    };
    return downloadPrescriptionController;
};
