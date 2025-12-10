import { Request, Response, Router } from "express";
import { pool } from "../../config/db";

const router = Router();

router.post("/signup", async (req: Request, res: Response) => {
  const { name, email, password, phone, role } = req.body;
  try {
    const result = await pool.query(
      `
        INSERT INTO Users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *
        `,
      [name, email, password, phone, role]
    );
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "User registration failed!",
      errors: err.message,
    });
  }
});

export const userRoutes = router;
