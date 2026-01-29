import getAllUsersRoute from "./getAllUsers";
import createUserRoute from "./createUser";
import getUserByIdRoute from "./getUserById";

import { Router } from "express";

const userRoutes = Router();
userRoutes.use(getAllUsersRoute);
userRoutes.use(createUserRoute);
userRoutes.use(getUserByIdRoute);

export default userRoutes;
