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

  if (userRole == 'customer' && password && (password as string).length < 6) {
    throw new Error("Password must be minimum of 6 characters.");
  }

  if(userRole === 'admin' && !['admin', 'customer'].includes(role as string)){
    throw new Error("user role can be either 'admin' or 'customer'");
  }

  let updateFields: any = {};

  if (name) updateFields.name = name;
  if (email) updateFields.email = email;
  if (password) updateFields.password = password;
  if (phone) updateFields.phone = phone;
  if (role) updateFields.role = role;
}

export const userServices = {
  getAllUsers,
  updateUser
};
