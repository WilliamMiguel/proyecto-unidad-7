import { Router } from "express";
import * as Controller from "./controller";

const playlistRouter: Router = Router();

playlistRouter.get("/", Controller.findAllPlaylist);
playlistRouter.post("/", Controller.createPlaylist);
playlistRouter.get("/:id", Controller.findPlaylistById);
playlistRouter.put("/add-song", Controller.updatePlaylist);
playlistRouter.delete("/:id", Controller.deletePlaylist);

export default playlistRouter;
