import express, { type Application } from "express";
import { userRouter, songRouter, playlistRouter } from "./components";
import { validateAuthorization } from "./components/middleware";

const app: Application = express();

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/songs", songRouter);
app.use("/api/v1/playlists", validateAuthorization, playlistRouter);

export default app;