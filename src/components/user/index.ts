import { Router } from "express";
import * as Controller from "./controller";
import { validateAuthorization } from "../middleware";

const userRouter: Router = Router();

/**
 * @openapi
 * /api/v1/users:
 *  get:
 *     tags:
 *     - Users
 *     description: Obtiene la lista de los usuarios registrados. Necesita autorizacion.
 *     responses:
 *       200:
 *         description: OK
 */
userRouter.get("/", validateAuthorization, Controller.findAllUsers);
userRouter.get("/:id", validateAuthorization, Controller.findUserById);
userRouter.put("/:id", validateAuthorization, Controller.updateUser);
userRouter.delete("/:id", validateAuthorization, Controller.deleteUser);

//Crear usuario - Iniciar sesión
userRouter.post("/", Controller.createUser);
userRouter.get("/:id", Controller.findUserById);
userRouter.put("/:id", Controller.updateUser);
userRouter.delete("/:id", Controller.deleteUser);
userRouter.post("/login", Controller.login);

export default userRouter;
