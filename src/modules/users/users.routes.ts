import { Router } from "express";
import { userController } from "./users.controller";
import auth from "../../middleware/auth";

const router = Router();

router.get("/users", auth("admin"), userController.getAllUsers)

export const userRoutes = router;