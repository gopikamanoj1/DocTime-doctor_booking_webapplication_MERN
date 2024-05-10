"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (dependencies) => {
    const { sendMessegesUseCase } = dependencies.useCase;
    const sendMessegesController = async (req, res) => {
        try {
            const { content, recieverId, senderId, type, converstationId, } = req.body;
            const data = {
                content,
                recieverId,
                senderId,
                type,
                converstationId
            };
            const response = await sendMessegesUseCase(dependencies).executeFunction(data);
            if (response && response.status && response.data) {
                res.json({ status: true, data: response.data });
            }
            else {
                res.json({ status: false, message: "Data not found" });
            }
        }
        catch (error) {
        }
    };
    return sendMessegesController;
};
