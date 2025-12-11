import { Request, Response } from "express";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await 
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const userController = {
  getAllUsers,
};
