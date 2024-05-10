"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (dependencies) => {
    const { getKycStatusUseCase } = dependencies.useCase;
    const getKycStatusController = async (req, res) => {
        try {
            const { id } = req.body;
            const data = {
                id
            };
            const response = await getKycStatusUseCase(dependencies).executeFunction(data);
            console.log(response, "contro res");
            if (response.status) {
                res.status(200).json({ status: true, data: response.data });
            }
            else {
                res.status(500).json({ status: false, data: "error in getting status" });
            }
        }
        catch (error) {
            console.log(error, "error in getKycStatusController");
            res.status(500).json({ status: false, message: 'Error in getKycStatusController' });
        }
    };
    return getKycStatusController;
};
