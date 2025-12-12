import { Request, Response } from "express"
import { vehicleServices } from "./vehicles.services"

const createVehicle = async(req: Request, res: Response) =>{
    try {
       const result =  await vehicleServices.createVehicle(req.body);
       if(result.rows.length === 0){
        
       }
    } catch (error:any) {
        console.log("From controller: ",error.message);
    }
}

export const vehicleController = {
    createVehicle
}