import { Router } from "express";
import { findAll, createUser } from "./controller";

const userRouter: Router = Router();

userRouter.get("/", findAll);
userRouter.post("/", createUser);
// userRouter.get("/:id", Controller.findById);

export default userRouter;