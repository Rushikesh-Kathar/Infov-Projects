import { Router } from "express";
import { registerUser, loginUser, getProfile, updateProfile, deleteProfile } from "../controller/user.controller";

const router = Router();

router.post("/users/register", registerUser);
router.post("/users/login", loginUser);
router.get("/users/profile", getProfile);
router.patch("/users/:id", updateProfile);
router.delete("/users/:id", deleteProfile);

export default router;