import { Request, Response } from "express";
import { authServices } from "./auth.services";


const registerUser = async (req: Request, res: Response) => {
  try {
    const result = await authServices.registerUser(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result.data,
    });
  } catch (err: any) {
     res.status(500).json({
      success: false,
      message: "User registration failed!",
      errors: err.message,
    });
  }
};

export const authController = { registerUser };
