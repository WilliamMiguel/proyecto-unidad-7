import { Router } from "express";
import { findAll, createSong } from "./controller";

const userRouter: Router = Router();

userRouter.get("/", findAll);
userRouter.post("/", createSong);

export default userRouter;