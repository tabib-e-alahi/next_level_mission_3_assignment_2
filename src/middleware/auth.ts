import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/config";

const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if(!token){
        throw new Error("You are not authorized!");
    }
    const secret = config.jwt_secret
    const decoded = jwt.verify(token, secret) as JwtPayload
  };
};
