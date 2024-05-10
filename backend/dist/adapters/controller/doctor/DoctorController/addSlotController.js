"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (dependencies) => {
    const { addSlotUseCase } = dependencies.useCase;
    if (!addSlotUseCase) {
        console.log('EROOOOORRR addSlotController');
    }
    const addSlotController = async (req, res) => {
        try {
            const { doctorId, startDate, endDate, slotTime } = req.body;
            const data = { doctorId, startDate, endDate, slotTime };
            const response = await addSlotUseCase(dependencies).executeFunction(data);
            if (response.status) {
                res.status(200).json({ status: true, message: 'Slots added successfully' });
            }
            else {
                res.status(500).json({ status: false, message: response.message });
            }
        }
        catch (error) {
            console.log(error, "error in add slot controller");
            res.status(500).json({ status: false, message: 'Error in add slot controller' });
        }
    };
    return addSlotController;
};
