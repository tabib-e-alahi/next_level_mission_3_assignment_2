import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/config";
import { pool } from "../config/db";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new Error("Unauthorized Access!");
      }
      const decoded = jwt.verify(token, config.jwt_secret!) as JwtPayload;
      const user = await pool.query(
        `
        SELECT * FROM Users WHERE email=$1
        `,
        [decoded.email]
      );

      if (user.rows.length === 0) {
        throw new Error("User not found.");
      }

      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        throw new Error("Unauthorized Access!");
      }

      next();
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };
};

export default auth;
