import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";

export const roleMiddleware = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ message: "Не авторизовано" });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({ message: "Недостатньо прав доступу" });
      return;
    }

    next();
  };
};