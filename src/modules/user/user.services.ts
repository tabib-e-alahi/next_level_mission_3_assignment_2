import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

const registerUser = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;

  if ((password as string).length < 6) {
    return {
      success: false,
      message: "Password must be of minimumn 6 characters!",
    };
  }

  if (!(role === "admin" || role === "customer")) {
    return {
      success: false,
      message: "User role must be either 'admin' or 'customer'",
    };
  }
  const hashedPassword = await bcrypt.hash(password as string, 10);

  const email_lowerCased: string = (email as string).toLowerCase();
  const role_lowerCased: string = role.toLowerCase()

  const result = await pool.query(
    `
            INSERT INTO Users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *
            `,
    [name, email_lowerCased, hashedPassword, phone, role]
  );

  const data = {
    id: result.rows[0].id,
    name: result.rows[0].name,
    email: result.rows[0].email,
    phone: result.rows[0].phone,
    role: result.rows[0].role,
  };

  return {
    success: true,
    data: data,
  };
};

export const userServices = { registerUser };
