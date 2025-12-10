import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

const registerUser = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;

  const hashedPassword = await bcrypt.hash(password as string, 10);

  const result = await pool.query(
    `
            INSERT INTO Users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *
            `,
    [name, email, hashedPassword, phone, role]
  );
  const {id, name, email, phone, role} = result.rows[0]
  const data = {
    id: id,
    name: name,
    email: email,
    phone: phone,
    role: role
  }
  return result;
};

export const userServices = { registerUser };
