import { Response } from 'express';
import jwt from 'jsonwebtoken';

interface GenerateTokenOptions {
  userId: any;
}
const generateToken = ({  userId }: GenerateTokenOptions): { token: string }=> {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });
  return {token};
};
export default generateToken;
// Function to verify a JWT token and return the decoded payload
export const verifyToken = (token: string) => {
   return jwt.verify(token, process.env.JWT_SECRET as string);
 };










// import jwt from 'jsonwebtoken';

// interface GenerateTokensOptions {
//  userId: string;
// }

// const generateTokens = ({ userId }: GenerateTokensOptions): { accessToken: string, refreshToken: string } => {

//  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
//     expiresIn: '15m', // Access token expires in 15 minutes
//  });


//  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET as string, {
//     expiresIn: '7d', // Refresh token expires in 7 days
//  });

//  return { accessToken, refreshToken };
// };

// export default generateTokens;



