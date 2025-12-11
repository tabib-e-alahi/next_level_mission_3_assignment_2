import { Request, Response } from "express";
import { userServices } from "./users.services";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsers();

    if(result.rows.length === 0){
        throw new Error("Users data not found.")
    }
    res.status(200).json({
        success: true,
        message: Users retrieved successfully
    })
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
      data: []
    });
  }
};

export const userController = {
  getAllUsers,
};
