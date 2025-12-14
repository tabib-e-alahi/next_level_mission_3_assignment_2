import { Router } from "express";
import { userController } from "./users.controller";
import auth from "../../middleware/auth";

const router = Router();

// get all users
router.get("/", auth("admin"), userController.getAllUsers);

router.put("/:userId", auth("admin", "customer"), userController.updateUser);

router.delete("/:userId", auth("admin"));

export const userRoutes = router;
