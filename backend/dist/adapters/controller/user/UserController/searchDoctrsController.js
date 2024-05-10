"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (dependecies) => {
    const { searchDoctrsUseCase } = dependecies.useCase;
    const searchDoctrsController = async (req, res) => {
        try {
            const searchParams = {
                doctorName: req.body.doctorName
            };
            const response = await searchDoctrsUseCase(dependecies).executeFunction(searchParams);
            if (response.status) {
                res.json({ status: true, data: response.data });
            }
            else {
                res.json({ status: false, messege: response.messege });
            }
        }
        catch (error) {
            console.log(error, "error in searchDoctorsController ");
            res.status(500).json({ status: false, message: "Internal server error" });
        }
    };
    return searchDoctrsController;
};
