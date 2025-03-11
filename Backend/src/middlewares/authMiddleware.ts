import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        userType: 'user' | 'admin';
      };
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
): void => {
  const token = req.cookies.AuthToken;
  console.log(token);

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      userType: 'user' | 'admin';
      iat: number;
      exp: number;
    };

    req.user = {
      userId: decoded.userId,
      userType: decoded.userType
    };

    console.log('Authenticated user', req.user);
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid authToken" });
  }
};

// Admin-only middleware
export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user?.userType !== "admin") {
    res.status(403).json({ message: "Forbidden: only admins can access this" });
    return;
  }

  next();
};
