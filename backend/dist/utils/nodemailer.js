"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtp = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
function generateOtp() {
    const digits = '1234567890';
    let otp = '';
    for (let i = 0; i < 4; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
}
const sendOtp = async (email) => {
    try {
        // console.log(email,"hh");
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.AUTH_EMAIL,
                pass: process.env.AUTH_PASS,
            },
        });
        const otp = generateOtp();
        console.log(otp, "otpotpotpotp");
        const info = await transporter.sendMail({
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: 'Verify Your Account  ✔',
            text: `Your OTP is: ${otp}`,
            html: `<b>
          <h2 style="color: #3498db;">Verify Your Account</h2>
          <p style="font-size: 16px;">Thank you for creating an account! To complete the verification process, use the following OTP:</p>
          <p style="font-size: 24px; font-weight: bold; color: #2ecc71;">Your OTP is: ${otp}</p>
          <p style="font-size: 14px; margin-top: 20px;">Click the button below to verify your email:</p>
          <a href="#" style="display: inline-block; padding: 10px 20px; background-color: #2ecc71; color: #fff; text-decoration: none; border-radius: 5px; margin-top: 10px;">Verify Email</a>
        </b>`,
        });
        // console.log(info,"infoo");
        if (info) {
            // console.log("hy mailer");
            return { status: true, otp: otp };
        }
        else {
            return { status: false, message: 'Nodemailer failed error' };
        }
    }
    catch (error) {
        console.error('Error in sending OTP:', error);
        return { status: false, message: 'Internal Server Error' };
    }
};
exports.sendOtp = sendOtp;
