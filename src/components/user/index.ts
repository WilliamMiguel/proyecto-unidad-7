import { Router } from "express";
import * as Controller from "./controller";

const userRouter: Router = Router();

userRouter.get("/", Controller.findAllUsers);
userRouter.post("/", Controller.createUser);
userRouter.get("/:id", Controller.findUserById);
userRouter.put("/:id", Controller.updateUser);
userRouter.delete("/:id", Controller.deleteUser)
userRouter.post("/login", Controller.loginUser)

export default userRouter;