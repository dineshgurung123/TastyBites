import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"; // Corrected import

declare global {
  namespace Express {
    interface Request {
      user?: any;
      cookies: {
        AuthToken: string;
      };
    }
  }
}

export const authenticationUser = (
  req: Request,
  res: Response,
  next: NextFunction
):void => {
 
  const token = req.cookies.AuthToken; // Corrected variable name
  console.log(token)
  if (!token) {
     res.status(401).json({ message: "Unauthorized" });
     return
      // Use object {} and correct status
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string); // Corrected method and variable
    console.log(decoded)
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid authToken" }); // Use object {}
  }
};