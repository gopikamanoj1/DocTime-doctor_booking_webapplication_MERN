"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (dependencies) => {
    const { getConsultCallStatusUseCase } = dependencies.useCase;
    const getConsultCallStatusController = async (req, res) => {
        try {
            const { userId } = req.query;
            console.log(userId, 'TTTTTTTTTTTTTTT');
            const data = {
                userId
            };
            const response = await getConsultCallStatusUseCase(dependencies).executeFunction(data);
            if (response.status) {
                console.log(response.data, 'THIS SI DATA FROM STATUS');
                res.json({ status: true, data: response.data });
            }
            else {
                res.json({ status: false, message: response.message });
            }
        }
        catch (error) {
            console.error("Error in getConsultCallStatusController :", error);
            res.status(500).json({ status: false, message: "Internal Server Error" });
        }
    };
    return getConsultCallStatusController;
};
