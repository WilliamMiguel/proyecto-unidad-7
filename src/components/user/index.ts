import { Router } from "express";
import * as Controller from "./controller";
import { validateAuthorization } from "../middleware";

const userRouter: Router = Router();

userRouter.get("/", validateAuthorization, Controller.findAllUsers);
userRouter.get("/:id", validateAuthorization, Controller.findUserById);
userRouter.put("/:id", validateAuthorization, Controller.updateUser);
userRouter.delete("/:id", validateAuthorization, Controller.deleteUser)

//Crear usuario - Iniciar sesión
userRouter.post("/", Controller.createUser);
userRouter.post("/login", Controller.loginUser)

export default userRouter;