import { Request, Response, Router } from "express";

const router = Router();

router.post("/signup", async (req: Request, res: Response) => {
  const { name, email, password, phone, role } = req.body;
  try {
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "User registration failed!",
      errors: err.message,
    });
  }
});

export const userRoutes = router;
