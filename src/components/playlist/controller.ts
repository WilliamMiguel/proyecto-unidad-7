import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findAllPlaylist = async (_req: Request, res: Response): Promise<void> => {
    try {
        const playlists = await prisma.playlist.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                    }
                },
                songs: true
            },
        });

        res.status(200).json({
            data: playlists,
        });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: error })
    }
};

export const findPlaylistById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const playlist = await prisma.playlist.findUnique({
            where:
            {
                id: Number(id)
            },
            include: {
                user: {
                    select: {
                        name: true,
                    }
                },
                songs: true
            },
        });

        if (!playlist) {
            res.status(404).json({ message: "Playlist no encontrada" });
        }
        else {
            res.status(200).json({ message: playlist });
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
};

export const createPlaylist = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, user } = req.body;

        await prisma.playlist.create({
            data: {
                name,
                user: { connect: { id: user } }
            }
        });

        res.status(201).json({ message: "Playlist creada correctamente" });
    }
    catch (error) {
        res.status(500).json({ message: error })
    }
};

// playlistRouter.put("/add-song", Controller.updatePlaylist);
export const updatePlaylist = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id_song, id_playlist } = req.body;

        const playlistup = await prisma.playlist.update({
            where:
            {
                id: id_playlist
            },
            data:
            {
                songs: { connect: { id: id_song } }
            },
            select:
            {
                songs: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });

        res.status(200).json({ message: "Actualizado", data: playlistup });
    } catch (error) {
        res.status(500).json({ message: error })
    }
};

export const deletePlaylist = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const playlist = await prisma.playlist.delete({
            where:
            {
                id: Number(id)
            },
        });

        res.status(200).json({ message: "Playlist eliminada" });
    }
    catch (error) {
        res.status(500).json({ message: error })
    }
};