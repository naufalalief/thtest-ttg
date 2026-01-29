import getAllUsersRoute from "./getAllUsers";
import createUserRoute from "./createUser";

import { Router } from "express";

const userRoutes = Router();
userRoutes.use(getAllUsersRoute);
userRoutes.use(createUserRoute);

export default userRoutes;
