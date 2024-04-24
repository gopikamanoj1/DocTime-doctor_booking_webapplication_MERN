import {sendOtp} from '../../../utils/nodemailer'
export default function generateOtpUseCase(dependencies: any) {
  const { userRepositery } = dependencies.repositery;

  const executeFunction = async (data: any) => {
    try {
     
      const userExists = await userRepositery.getUserByEmail(data);

      // if (userExists) {
       
      //   return { status: false, message: 'User already exists' };
      // }
      console.log(data.email,"email fron use case");
      
    const response=  await sendOtp(data.email);
      if (response.status) {
        return { status: true, data: response.otp };
      } else {
        return { status: false, message: response.message };
      }
    } catch (error) {
      console.error('Error in generateOtpUseCase :', error);
      return { status: false, message: 'Internal Server Error' };
    }
  };

  return { executeFunction };
}



