import { Request, Response } from "express";

export default (dependecies: any) => {

    const { doctorVerifyOtpUseCase } = dependecies.useCase

    const doctorVerifyOtpController = async (req: Request, res: Response) => {

        const { enteredOtp } = req.body
        console.log(req.body, "reqqqqqqqqqbodyyyyyyyyy")
        const doctorData = req.session.doctorData
        if (req.session.Otp === enteredOtp) {
            const response = await doctorVerifyOtpUseCase(dependecies).executeFunction(doctorData);
            if (response.status) {
                res.status(200).json({ status: true, data: response.data })
            } else {
                res.status(400).json({ status: false, message: response.message })
            }
        } else {
            res.status(400).json({ status: false, message: "Wrong otp" })
        }
    }
    return doctorVerifyOtpController;
}