"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (dependencies) => {
    const { handleDoctorBlockUseCase } = dependencies.useCase;
    const handleDoctorBlockController = async (req, res) => {
        try {
            const { doctorId } = req.params;
            const response = await handleDoctorBlockUseCase(dependencies).executeFunction(doctorId);
            if (response && response.status) {
                res.json({ status: true, data: response.data });
            }
            else {
                res.status(400).json({ status: false, message: response.message || "Doctor blocking/unblocking failed" });
            }
        }
        catch (error) {
            console.error("Error in handleDoctorBlockController:", error);
            res.status(500).json({ status: false, message: "Internal server error" });
        }
    };
    return handleDoctorBlockController;
};
