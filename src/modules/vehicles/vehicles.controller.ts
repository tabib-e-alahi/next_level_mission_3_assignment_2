import { Request, Response } from "express"
import { vehicleServices } from "./vehicles.services"

const getAllVehicles = async(req: Request, res: Response) =>{

    try {
       const result =  await vehicleServices.getAllVehicles(req.body);
       console.log(result);
    } catch (error:any) {
        console.log(""error.message);
    }
}

export const vehicleController = {
    getAllVehicles
}