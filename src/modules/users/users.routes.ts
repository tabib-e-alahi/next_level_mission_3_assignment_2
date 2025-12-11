import { Router } from "express";
import { userController } from "./users.controller";

const router = Router();

router.get("/users", auth userController.getAllUsers)

export const userRoutes = router;