import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

//! 1. User registration
const registerUser = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;

  if ((password as string).length < 6) {
    throw new Error("Password must be of minimumn 6 characters!");
  }

  if (!(role === "admin" || role === "customer")) {
    throw new Error("User role must be either 'admin' or 'customer'");
  }

  const hashedPassword = await bcrypt.hash(password as string, 10);

  const email_lowerCased: string = (email as string).toLowerCase();
  const role_lowerCased: string = role.toLowerCase();

  const result = await pool.query(
    `
            INSERT INTO Users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *
            `,
    [name, email_lowerCased, hashedPassword, phone, role_lowerCased]
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

//! 2. User login
const signInUser = async (email: string, password: string) => {
  const result = await pool.query(
    `
    SELECT * FROM Users WHERE email=$1 
    `,
    [email]
  );

  //checkin if there is any user with this email or not
  if (result.rows.length === 0) {
    throw new Error(
      "No account found with this email. Please register you account first."
    );
  }

  const user = result.rows[0];
  const isMatched = await bcrypt.compare(password, user.password);

  //if there is a user then password checking
  if (!isMatched) {
    return {
      success: false,
      message: ,
    };
  }
};

export const authServices = { registerUser };
