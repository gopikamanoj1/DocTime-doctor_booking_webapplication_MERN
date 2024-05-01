import { log } from "console";
import { Request, Response } from "express";
import { hashPassword } from "../../../../utils";
export default (dependencies: any) => {
  const { registerUseCase } = dependencies.useCase;
  const registerController = async (req: Request, res: Response) => {
    try {
      // Extract necessary data from the request body
      const { name, email, password } = req.body;

      // Hash the password
      const hashedPassword = await hashPassword(password);

      const data = {
        name,
        email,
        password: hashedPassword,
      };

      req.session.userData = data;

      // Call the register use case
      const response = await registerUseCase(dependencies).executeFunction(data);
      console.log(response,"response");
  
      if (response.status) {
        req.session.Otp = response.data;
        res.json({ status: true , data: response.data });
      } else  {
        res.json({ status: false, data: response.data });
      }
      if (response.status === false) {
        console.log("User already exists:", response.data);
      }
    } catch (error) {
      console.error("Error in register controller:", error);
      res.status(500).json({ status: false, message: "Internal Server Error" });
    }
  };

  return registerController;
};
