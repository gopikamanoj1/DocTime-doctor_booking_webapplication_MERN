import { hashPassword, verifyHashPassword } from "../../../utils";

export default function loginUseCase(dependencies: any) {
  const { userRepositery } = dependencies.repositery;

  const executeFunction = async (data: any) => {
    console.log('this is data', data);
  
    const response = await userRepositery.finduser(data.email);
    console.log(response, "responseresponseresponse");
  
    if (response.status) {
      const user = response.user; // Assuming the user data is within the 'user' property
  
      // Check if the entered password is correct
      const isPasswordCorrect = await verifyHashPassword(data.password, user.password);
  
      if (isPasswordCorrect) {
        return { status: true, data: user };
      } else {
        return { status: false, message: 'Incorrect password' };
      }
    } else {
      return { status: false, message: response.message };
    }
  };

  return { executeFunction };
}
