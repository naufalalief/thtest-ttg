import { getUserByIdController } from "controller/user";
import { Router } from "express";

const router = Router();
router.get("/users/:id", getUserByIdController);

export default router;
