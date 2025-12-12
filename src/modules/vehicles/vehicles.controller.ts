import { Request, Response } from "express"
import { vehicleServices } from "./vehicles.services"

const getAllVehicles = async(req: Request, res: Response) =>{
    try {
       const result =  await vehicleServices.getAllVehicles;
       console.log(result);
    } catch (error) {
        
    }
}

export const vehicleController = {
    getAllVehicles
}