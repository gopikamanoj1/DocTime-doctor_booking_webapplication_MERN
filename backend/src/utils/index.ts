// import { sentOtp } from "../utils/nodemailer";
import { sendOtp } from "../utils/nodemailer";
import { hashPassword,verifyHashPassword } from "./hashPassword"; 
import  generateToken  from "./generateToken";

export { sendOtp,hashPassword,verifyHashPassword,generateToken };

