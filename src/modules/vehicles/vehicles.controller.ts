import { Request, Response } from "express";
import { vehicleServices } from "./vehicles.services";

//* create vehicle controller
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

//* retrieve all vehicles data
const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getAllVehicles();

    if (result.rows.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No vehicles found",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Vehicles data could not be retrieved.",
      error: err.message,
      data: null,
    });
  }
};

const getVehicleById = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getVehicleById(req.params);
    if (result.rows.length === 0) {
      throw new Error("Vehicle data not found with this id.");
    }

    return res.status(200).json({
      success: true,
      message: "Vehicle retrieved successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Vehicle data could not be retrieved.",
      error: err.message,
    });
  }
};

const updateVehicleByID = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.updateVehicleByID({
      ...req.body,
      vehicleId: req.params.vehicleId,
    });

    if (result.rows.length === 0) {
      throw new Error("Vehicle data not found.");
    }

    return res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message
    })
  }
};

const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.deleteVehicle(req.params);
    if (result.rowCount === 0) throw new Error("Vehicle Data not found");
    return res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const vehicleController = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicleByID,
  deleteVehicle,
};
