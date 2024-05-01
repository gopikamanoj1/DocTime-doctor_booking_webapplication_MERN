import { sendOtp } from '../../../utils/nodemailer'
export default function registerUseCase(dependencies: any) {
  const { userRepositery } = dependencies.repositery;

  const executeFunction = async (data: any) => {
    try {
      const userExists = await userRepositery.getUserByEmailForRegister({ email: data.email });
      console.log(userExists,"userExists");
      
      if (userExists.data) {
        return { status: false, data: "User already exists" };
      } else {
        const response = await sendOtp(data.email); // Send OTP only if user does not exist
        return response.status
          ? { status: true, data: response.otp }
          : { status: false, data: response.message };
      }
      
    } catch (error) {
      console.error('Error in register use case:', error);
      return { status: false, message: 'Internal Server Error' }; 
    }
  };
  return { executeFunction };
}



