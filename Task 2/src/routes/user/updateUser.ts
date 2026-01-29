import { Router } from "express";
import { updateUserController } from "controller/user";

const router = Router();
router.put("/users/:id", updateUserController);

export default router;
