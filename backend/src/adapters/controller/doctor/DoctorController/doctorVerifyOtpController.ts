import { Request, Response } from "express";

export default (dependecies: any) => {

    const { doctorVerifyOtpUseCase } = dependecies.useCase

    const doctorVerifyOtpController = async (req: Request, res: Response) => {

        const { enteredOtp } = req.body
        console.log(req.body, "reqqqqqqqqqbodyyyyyyyyy")
        const doctorData = req.session.doctorData



        // Ensure both OTPs are strings and trimmed of whitespace
        const sessionOtp = (req.session.Otp || '').toString().trim();
        const inputOtp = (enteredOtp || '').toString().trim();

        console.log("Trimmed Entered OTP:", inputOtp); // Add this for debugging
        console.log("Trimmed Session OTP:", sessionOtp); // Add this for debugging

        if (sessionOtp == inputOtp) {
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