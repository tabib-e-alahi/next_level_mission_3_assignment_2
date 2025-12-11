import { Request, Response } from "express";
import { authServices } from "./auth.services";

const registerUser = async (req: Request, res: Response) => {
  try {
    const result = await authServices.registerUser(req.body);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "User registration failed!",
      errors: err.message,
    });
  }
};

const signInUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await authServices.signInUser(email, password);

    return res.status(201).json({
      success: true,
      message: "User sign in suce",
      data: result,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "User registration failed!",
      errors: err.message,
    });
  }
};

export const authController = { registerUser };
