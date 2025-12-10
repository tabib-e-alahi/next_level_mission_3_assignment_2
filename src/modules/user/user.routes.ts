import { Request, Response, Router } from "express";

const router = Router();

router.post("/signup", async (req: Request, res: Response) => {
  const { name, email, password, phone, role } = req.body;
});

export const userRoutes = router;
