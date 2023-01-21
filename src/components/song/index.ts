import { Router } from "express";
import * as Controller from "./controller";
import { verifyToken } from "./middleware";

const songRouter: Router = Router();

songRouter.get("/", verifyToken, Controller.findAllSongs);
songRouter.post("/", Controller.createSong);
songRouter.get("/:id", Controller.findSongById);
songRouter.put("/:id", Controller.updateSong);
songRouter.delete("/:id", Controller.deleteSong);

export default songRouter;
