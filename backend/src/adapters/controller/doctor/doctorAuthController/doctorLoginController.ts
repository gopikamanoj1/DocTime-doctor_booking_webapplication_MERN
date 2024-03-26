import { Request, Response } from "express";
export default (dependecies: any) => {


  const { doctorLoginUseCase } = dependecies.useCase
  const doctorLoginController = async (req: Request, res: Response) => {

    const { email, password } = req.body
    console.log(req.body, "hfffffffffffh");

    const data = {
      email,
      password,
    }
    const responce = await doctorLoginUseCase(dependecies).executeFunction(data)

    
    
    if (responce.status) {
      const {token}=responce
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', 
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000, 
      });
      res.json({ status: true, data: responce.data,token })
    } else {
      res.json({ status: false, message: responce.message })
    }

  };
  return doctorLoginController;
};
