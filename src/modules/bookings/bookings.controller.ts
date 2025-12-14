import { Request, Response } from "express";
import { bookingServices } from "./bookings.services";
import { vehicleServices } from "../vehicles/vehicles.services";
import { JwtPayload } from "jsonwebtoken";

const createBookings = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.createBookings(req.body);

    await vehicleServices.updateVehicleByID({
      vehicleId: result.vehicle_id,
      availability_status: "booked",
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (err: any) {
    return res.status(403).json({
      success: false,
      message: "Booking failed.",
      error: err.message,
    });
  }
};

const getAllBookings = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.getAllBookings(req.user as JwtPayload);

    if (result?.rows.length === 0) {
      throw new Error("No bookings data dound.");
    }

    return res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: result?.rows,
    });
  } catch (err: any) {
    return res.status(403).json({
      success: false,
      message: "Bookings data could not be retrieved.",
      error: err.message,
    });
  }
};

const updateBookings = async(req: Request, res: Response) =>{  
}

export const bookingController = {
  createBookings,
  getAllBookings,
};
