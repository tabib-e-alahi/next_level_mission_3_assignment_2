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
  if (userRole === "customer" && password) {
    updateFields.password = await bcrypt.hash(password as string, 10);
  }
  if (phone) updateFields.phone = phone;
  if (userRole === "admin" && role) updateFields.role = role;

  if (Object.keys(updateFields).length === 0) {
    throw new Error("There is no valid fields to update.");
  }

  let final_result: any = null;

  for (const key of Object.keys(updateFields)) {
    const result = await pool.query(
      `UPDATE Users SET ${key}=$1 WHERE id=$2 RETURNING *`,
      [updateFields[key], userId]
    );
    if (result.rows.length > 0) {
      final_result = result;
    }
  }

  if (userRole === "admin") delete final_result.rows[0].password;

  return final_result;
};

const deleteUser = async (payload: Record<string, unknown>) => {
  const { userId } = payload;

  const bookings_result = await pool.query(
    `SELECT status FROM Bookings WHERE customer_id=$1`,
    [userId]
  );

  const active_booking = bookings_result.rows.some(
    (res) => res.status === "active"
  );

  if (hasActiveBooking) {
    throw new Error(
      "This user has active bookings. You can not delete this user."
    );
  }

  return await pool.query(`DELETE FROM Users WHERE id=$1`, [userId]);

  if (bookings_result.rows.length === 0) {
    const result = await pool.query(`DELETE FROM Users WHERE id=$1`, [userId]);
    return result;
  } else if (bookings_result.rows.length > 0) {
    const booking_status = bookings_result.rows.map((res) => res.status);
    //if 'active' bookings exist
    if (booking_status.includes("active")) {
      throw new Error(
        "This user has active bookings. You can not delete this user."
      );
    }
    const result = await pool.query(`DELETE FROM Users WHERE id=$1`, [userId]);

    return result;
  }
};

export const userServices = {
  getAllUsers,
  updateUser,
  deleteUser,
};
