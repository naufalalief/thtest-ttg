import { Router } from "express";
import { deleteUserController } from "controller/user";

const router = Router();
router.delete("/users/:id", deleteUserController);

export default router;
