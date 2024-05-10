"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (dependecies) => {
    const { viewDoctorDetailsUseCase } = dependecies.useCase;
    const viewDoctorDetailsController = async (req, res) => {
        try {
            const { id } = req.params;
            const response = await viewDoctorDetailsUseCase(dependecies).executeFunction(id);
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
    return viewDoctorDetailsController;
};
