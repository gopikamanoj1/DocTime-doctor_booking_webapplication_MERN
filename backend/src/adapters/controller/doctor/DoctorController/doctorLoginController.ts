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
      const { accessToken, refreshToken } = responce;
      res.cookie('jwt', accessToken, {
         httpOnly: true,
         secure: process.env.NODE_ENV !== 'development',
         sameSite: 'strict',
         maxAge: 15 * 60 * 1000, // Access token expires in 15 minutes
      });
      res.cookie('refresh_token', refreshToken, {
         httpOnly: true,
         secure: process.env.NODE_ENV !== 'development',
         sameSite: 'strict',
         maxAge: 7 * 24 * 60 * 60 * 1000, // Refresh token expires in 7 days
      });
      res.json({ status: true, data: responce.data, accessToken, refreshToken }); // Include refreshToken here
     } else {
      res.json({ status: false, message: responce.message });
     }

  };
  return doctorLoginController;
};


