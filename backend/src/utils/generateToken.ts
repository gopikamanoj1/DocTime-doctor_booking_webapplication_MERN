import { Response } from 'express';
import jwt from 'jsonwebtoken';

interface GenerateTokenOptions {
  res: Response;
  userId: string;
}

const generateToken = ({  userId }: GenerateTokenOptions): string => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });



  return token;
};

export default generateToken;
