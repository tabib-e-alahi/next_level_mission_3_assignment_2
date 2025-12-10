import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

const registerUser = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;

  if(password.lenght)

  const hashedPassword = await bcrypt.hash(password as string, 10);

  const result = await pool.query(
    `
            INSERT INTO Users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *
            `,
    [name, email, hashedPassword, phone, role]
  );

  const data = {
    id: result.rows[0].id,
    name: result.rows[0].name,
    email: result.rows[0].email,
    phone: result.rows[0].phone,
    role: result.rows[0].role,
  };

  return data;
};

export const userServices = { registerUser };
