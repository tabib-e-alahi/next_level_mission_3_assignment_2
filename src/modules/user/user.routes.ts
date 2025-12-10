import { Request, Response, Router } from "express";

const router = Router();

router.post("/signup", async (req: Request, res: Response) => {
  const { name, email, password, phone, role } = req.body;
  try {
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Error description",
      errors: "Error description",
    });
  }
});

export const userRoutes = router;
