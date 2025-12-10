import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userServices } from "./user.services";

const registerUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "User registration failed!",
      errors: err.message,
    });
  }
};

export const userController = {registerUser};
