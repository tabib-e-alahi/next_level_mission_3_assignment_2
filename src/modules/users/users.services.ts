import { pool } from "../../config/db"

const getAllUsers = async() =>{

    const result = await pool.query(`
        SELECT * FROM Users
        `)

}

export const userServices = {
    getAllUsers
}