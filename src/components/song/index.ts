import { Router } from "express";
import { findAll, createSong } from "./controller";

const songRouter: Router = Router();

songRouter.get("/", findAll);
songRouter.post("/", createSong);

export default songRouter;