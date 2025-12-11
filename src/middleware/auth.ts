import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";

const auth = () => {
  return async (req: Request, res: Response) => {
    const token = req.headers.authorization;

    if(!token){
        throw new Error("You are not authorized!");
    }

    const decoded = jwt.verify(token, config.jwt_secret)
  };
};
