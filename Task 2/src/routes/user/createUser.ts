import { Router } from "express";
import { createUserController } from "controller/user";

const router = Router();
router.post("/users", createUserController);

export default router;
