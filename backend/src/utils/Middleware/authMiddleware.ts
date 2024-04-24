// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

// const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.headers.authorization?.split(' ')[1]; // Bearer token
  
//   if (!token) {
//     return res.status(401).json({ status: false, message: 'No token provided.' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string); // Validate the token
//     req.user = decoded; // Store the user data in the request object for later use
//     next(); // Proceed to the next middleware or endpoint
//   } catch (err) {
//     return res.status(401).json({ status: false, message: 'Invalid or expired token.' });
//   }
// };

// export default authMiddleware;
