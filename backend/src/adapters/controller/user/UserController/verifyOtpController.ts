import { Request, Response } from "express";

export default (dependecies: any) => {

    const { verifyOtpUseCase } = dependecies.useCase

    const verifyOtpController = async (req: Request, res: Response) => {
        const { enteredOtp } = req.body
        console.log("Entered OTP:", enteredOtp); // Add this for debugging
        console.log("Session OTP:", req.session.Otp); // Add this for debugging
        console.log("User Data:", req.session.userData); // Add this for debugging

        const userData = req.session.userData
        // Ensure both OTPs are strings and trimmed of whitespace
        const sessionOtp = (req.session.Otp || '').toString().trim();
        const inputOtp = (enteredOtp || '').toString().trim();

        console.log("Trimmed Entered OTP:", inputOtp); // Add this for debugging
        console.log("Trimmed Session OTP:", sessionOtp); // Add this for debugging

        if (sessionOtp == inputOtp) {
            const responce = await verifyOtpUseCase(dependecies).executeFunction(userData)
            if (responce.status) {
                res.json({ status: true, data: responce.data })
            } else {
                res.json({ status: false, data: "Wrong OTP" })
            }
        } else {

            res.status(400).json({ status: false, message: "Wrong otp" })
        }




    }

    return verifyOtpController
}