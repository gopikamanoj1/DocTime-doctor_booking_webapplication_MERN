"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (dependencies) => {
    const { kycStatusUseCase } = dependencies.useCase;
    const kycStatusController = async (req, res) => {
        try {
            const doctorId = req.params.doctorId;
            const newStatus = req.body.kycStatus; // Assuming the new status is sent in the request body
            const response = await kycStatusUseCase(dependencies).executeFunction(doctorId, newStatus);
            if (response.status) {
                res.json({ status: true });
            }
            else {
                res.json({ status: false, message: response.message });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ status: false, message: "Internal Server Error" });
        }
    };
    return kycStatusController;
};
