"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (dependecies) => {
    const { bookAppointmentUseCase } = dependecies.useCase;
    const bookAppointmentController = async (req, res) => {
        try {
            const { doctorEmail, selectedTime, selectedDate } = req.body;
            const data = {
                doctorEmail,
                selectedDate,
                selectedTime
            };
            const response = await bookAppointmentUseCase(dependecies).executeFunction(data);
            if (response && response.status && response.data) {
                res.json({ status: true, data: response.data });
            }
            else {
                res.json({ status: false, data: response.data });
            }
        }
        catch (error) {
            console.log(error, "error in bookAppointmentController ");
        }
    };
    return bookAppointmentController;
};
