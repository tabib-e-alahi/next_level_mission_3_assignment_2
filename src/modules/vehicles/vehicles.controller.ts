import { Request, Response } from "express";
import { vehicleServices } from "./vehicles.services";

const createVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.createVehicle(req.body);
    return res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: true,
      message: "Vehicle created successfully",
      data: result.rows[0],
    })
  }
};

export const vehicleController = {
  createVehicle,
};
