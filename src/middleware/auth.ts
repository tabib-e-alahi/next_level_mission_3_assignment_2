import { Request, Response } from "express";

const auth = () => {
  return async (req: Request, res: Response) => {
    const token = req.headers.authorization;

    if(!token){
        throw new Error()
    }
  };
};
