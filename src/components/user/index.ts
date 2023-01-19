import { Router } from "express";
import { findAll, createUser, findById } from "./controller";

const userRouter: Router = Router();

userRouter.get("/", findAll);
userRouter.post("/", createUser);
userRouter.get("/:id", findById);

export default userRouter;