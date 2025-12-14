import { Router } from "express";
import { userController } from "./users.controller";
import auth from "../../middleware/auth";

const router = Router();

// get all users
router.get("/", auth("admin"), userController.getAllUsers);

// update a user: admin can update all, but a customer can update their own not others
router.put("/:userId", auth("admin", "customer"), userController.updateUser);

//delete a user if no active booking exist
router.delete("/:userId", auth("admin"), userController.deleteUser);

export const userRoutes = router;
