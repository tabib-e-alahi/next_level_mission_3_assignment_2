import { Request, Response } from "express";
import { vehicleServices } from "./vehicles.services";

//! create vehicle controller
const createVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.createVehicle(req.body);
    return res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Vehicle creation failed..",
      error: err.message,
    });
  }
};

export const vehicleController = {
  createVehicle,
};
