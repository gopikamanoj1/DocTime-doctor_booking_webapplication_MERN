
export default function checkOTPUseCase(dependencies: any) {
    const { userRepositery } = dependencies.repositery;
  
    const executeFunction = async (data:any) => {
      try {
       
        const response = await userRepositery.checkOTP(data);
        console.log('jijijij',"r",response);
        
  
        if (response.status) {
          return { status: true, data: response.data };
        } else {
          return { status: false, data: "Wrong Otp" };
        }
      } catch (error) {
        console.error('Error in verifyOtpUseCase:', error);
        return { status: false, message: 'Internal Server Error' };
      }
    };
  
    return { executeFunction };
  }
  