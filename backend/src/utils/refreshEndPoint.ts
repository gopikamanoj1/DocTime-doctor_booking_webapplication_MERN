// import { Request, Response } from 'express';
// import jwt from 'jsonwebtoken';
// import { generateAccessToken } from './generateToken'; // Import the function that generates a new access token

// const refreshTokenEndpoint = (req: Request, res: Response) => {
//   const refreshToken = req.cookies.refreshToken; // Retrieve refresh token from cookies
  
//   if (!refreshToken) {
//     return res.status(401).json({ status: false, message: 'No refresh token provided.' });
//   }

//   try {
//     const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET as string);
//     const userId = (decoded as any).userId;

//     // Generate a new access token
//     const newAccessToken = generateAccessToken(userId);
//     res.json({ status: true, accessToken: newAccessToken }); // Return the new access token
//   } catch (err) {
//     res.status(403).json({ status: false, message: 'Invalid or expired refresh token.' });
//   }
// };

// export default refreshTokenEndpoint;
