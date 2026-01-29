import getAllUsersRoute from "./getAllUsers";
import createUserRoute from "./createUser";
import getUserByIdRoute from "./getUserById";
import updateUserRoute from "./updateUser";

import { Router } from "express";

const userRoutes = Router();
userRoutes.use(getAllUsersRoute);
userRoutes.use(createUserRoute);
userRoutes.use(getUserByIdRoute);
userRoutes.use(updateUserRoute);

export default userRoutes;
