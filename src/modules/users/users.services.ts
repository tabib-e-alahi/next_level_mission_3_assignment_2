import bcrypt from "bcryptjs";
import { pool } from "../../config/db";

const getAllUsers = async () => {
  const result = await pool.query(`
        SELECT id, name, email, phone, role FROM Users
    `);

  return result;
};

const updateUser = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role, userId, userRole } = payload;

  if (userRole == "customer" && password && (password as string).length < 6) {
    throw new Error("Password must be minimum of 6 characters.");
  }

  if (userRole === "admin" && !["admin", "customer"].includes(role as string)) {
    throw new Error("user role can be either 'admin' or 'customer'");
  }

  let updateFields: any = {};

  if (name) updateFields.name = name;
  if (email) updateFields.email = email;
  if (userRole ==='cus' password) {
    updateFields.password = await bcrypt.hash(password as string, 10);
  }
  if (phone) updateFields.phone = phone;
  if (role) updateFields.role = role;

  if (Object.keys(updateFields).length === 0) {
    throw new Error("There is no valid fields to update.");
  }

  let final_result: any = null;

  for (const key of Object.keys(updateFields)) {
    const result = await pool.query(
      `UPDATE Vehicles SET ${key}=$1 WHERE id=$2 RETURNING *`,
      [updateFields[key], vehicleId]
    );
    if (result.rows.length > 0) {
      final_result = result;
    }
  }
};

export const userServices = {
  getAllUsers,
  updateUser,
};
