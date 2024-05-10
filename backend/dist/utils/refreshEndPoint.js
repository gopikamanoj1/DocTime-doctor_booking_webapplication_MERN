"use strict";
// import jwt from 'jsonwebtoken';
// import { generateTokens } from './generateToken';
// const refreshTokenController = (req, res) => {
//   const refreshToken = req.cookies.refreshToken; // Retrieve refresh token from cookies
//   if (!refreshToken) {
//     return res.status(401).json({ status: false, message: 'No refresh token provided' });
//   }
//   try {
//     const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string ); // Verify refresh token
//     const userId = decoded.userId; // Extract user ID
//     // Generate new tokens
//     const { accessToken, refreshToken: newRefreshToken } = generateTokens(userId);
//     // Set new refresh token as an HTTP-only cookie
//     res.cookie('refreshToken', newRefreshToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production', // Secure cookies in production
//     });
//     res.json({ status: true, accessToken }); // Return new access token
//   } catch (error) {
//     res.status(403).json({ status: false, message: 'Invalid or expired refresh token' });
//   }
// };
// export default refreshTokenController;
