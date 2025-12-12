import { pool } from "../../config/db";

const getAllUsers = async () => {
  const result = await pool.query(`
        SELECT id, name, email, phone, role FROM Users
    `);

  return result;
};

const updateUser = async(payload: Record<string, unknown>) =>{
  const {
    name,
    email,
    password,
    phone,
    role,
    userId, 
    userRole,
  } = payload;


  if (password && password.length < 6) {
    throw new Error("Password must be minimum of 6 characters.");
  }

  if (
    availability_status &&
    !["available", "booked"].includes(
      (availability_status as string).toLowerCase()
    )
  ) {
    throw new Error(
      "Invalid inputs! Availability Status is either 'available' or 'booked'"
    );
  }

export const userServices = {
  getAllUsers,
  updateUser
};
