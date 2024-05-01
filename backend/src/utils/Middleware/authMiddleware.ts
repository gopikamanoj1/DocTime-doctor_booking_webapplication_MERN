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








import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../generateToken';
// Middleware to verify JWT tokens
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = (req.headers as { authorization?: string }).authorization;
  
  const token = authorizationHeader?.split(' ')[1]; // Extract Bearer token

  if (!token) {
    return res.status(401).json({ status: false, message: 'No token provided' });
  }

  try {
    const decoded = verifyToken(token); // Verify the JWT token
    req.session = (decoded as any).userId; // Store the user ID in the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ status: false, message: 'Invalid or expired token' });
  }
};

