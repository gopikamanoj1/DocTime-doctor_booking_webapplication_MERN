import {sendOtp} from '../../../utils/nodemailer'
export default function doctorRegisterUseCase(dependencies: any) {
  const { doctorRepositery } = dependencies.repositery;

  const executeFunction = async (data: any) => {
    try {
     
      const doctorExists = await doctorRepositery.getDoctorByEmail(data.email);

      if (doctorExists) {
       
        return { status: false, message: 'Doctor already exists' };
      }
    const response=  await sendOtp(data.email);
      if (response.status) {
        return { status: true, data: response.otp };
      } else {
        return { status: false, message: response.message };
      }
    } catch (error) {
      console.error('Error in register use case:', error);
      return { status: false, message: 'Internal Server Error' };
    }
  };

  return { executeFunction };
}



