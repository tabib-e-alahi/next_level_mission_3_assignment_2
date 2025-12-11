import { pool } from "../../config/db"

const getAllUsers = async() =>{

    const result = await pool.query(`
        
        `)

}

export const userServices = {
    getAllUsers
}