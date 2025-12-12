import { Request, Response } from "express";
import { userServices } from "./users.services";
import { JwtPayload } from "jsonwebtoken";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsers();

    if (result.rows.length === 0) {
      throw new Error("Users data not found.");
    }
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
      data: [],
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { role: userRole, id: loggedInUserId } = req.user as JwtPayload;
  try {
    // if the user is not admin and also trying to update another profile
    if (userRole !== "admin") {
      if (loggedInUserId !== parseInt(userId as string))
        throw new Error("You are not authorized to update this user profile.");
    }
    const result = await userServices.updateUser({
      ...req.body,
      userId: req.params.userId,
      userRole: userRole,
    });

    if (result.rows.length === 0) {
      throw new Error("User data not found.");
    }

    return res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(403).json({
      success: false,
      message: err.message,
    });
  }
};

export const userController = {
  getAllUsers,
  updateUser,
};
