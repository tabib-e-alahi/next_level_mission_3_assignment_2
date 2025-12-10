import { Request, Response, Router } from "express";
import { pool } from "../../config/db";
import { userController } from "./user.controller";

const router = Router();

router.post("/signup", userController.registerUser);

export const userRoutes = router;
