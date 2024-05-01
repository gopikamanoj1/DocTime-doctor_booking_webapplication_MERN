import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
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
      const { token } = responce;
      res.cookie('jwt', token, {
         httpOnly: true,
         secure: process.env.NODE_ENV !== 'development',
         sameSite: 'strict',
         maxAge: 15 * 60 * 1000, // Access token expires in 15 minutes
      });
    
      res.json({ status: true, data: responce.data, token }); // Include refreshToken here
     } else {
      res.json({ status: false, message: responce.message });
     }

  };
  return doctorLoginController;
};


