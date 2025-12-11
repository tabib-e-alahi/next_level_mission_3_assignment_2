import { Request, Response } from "express";
import { userServices } from "./auth.services";

const registerUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.registerUser(req.body);

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: result.message,
      });

      return;
    }

    res.status(201).json({
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

export const userController = { registerUser };
