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

/**
 * @openapi
 * /api/v1/users/:id:
 *  get:
 *     tags:
 *     - Users
 *     description: Obtiene un usuario en especifico. Necesita autorizacion.
 *     responses:
 *       200:
 *         description: OK
 */
userRouter.get("/:id", validateAuthorization, Controller.findUserById);

/**
 * @openapi
 * /api/v1/users/:id:
 *  put:
 *     tags:
 *     - Users
 *     description: Actualiza los campos un usuario en especifico. Necesita autorizacion
 *     responses:
 *       200:
 *         description: OK
 */
userRouter.put("/:id", validateAuthorization, Controller.updateUser);

/**
 * @openapi
 * /api/v1/users/:id:
 *  delete:
 *     tags:
 *     - Users
 *     description: Borra un usuario en especifico. Necesita autorizacion
 *     responses:
 *       200:
 *         description: OK
 */
userRouter.delete("/:id", validateAuthorization, Controller.deleteUser);

/**
 * @openapi
 * /api/v1/users/:
 *  post:
 *     tags:
 *     - Users
 *     description: Registra un nuevo usuario. Necesita autorizacion
 *     responses:
 *       200:
 *         description: OK
 */
userRouter.post("/", Controller.createUser);

userRouter.get("/:id", Controller.findUserById);
userRouter.put("/:id", Controller.updateUser);
userRouter.delete("/:id", Controller.deleteUser);
userRouter.post("/login", Controller.login);

export default userRouter;
