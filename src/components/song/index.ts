import { Router } from "express";
import * as Controller from "./controller";
import { verifyToken, validateAuthorization } from "../middleware";

const songRouter: Router = Router();

songRouter.get("/", verifyToken, Controller.findAllSongs);
songRouter.post("/", validateAuthorization, Controller.createSong);
songRouter.get("/:id", verifyToken, Controller.findSongById);
songRouter.put("/:id", validateAuthorization, Controller.updateSong);
songRouter.delete("/:id", validateAuthorization, Controller.deleteSong);

export default songRouter;
