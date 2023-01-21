import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findAllSongs = async (_req: Request, res: Response): Promise<void> => {
    try {
        const songs = await prisma.song.findMany();

        res.status(200).json({
            data: songs
        });
    }
    catch (error) {
        res.status(500).json({ message: error })
    }
};

export const findSongById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const song = await prisma.song.findUnique({
            where:
            {
                id: Number(id)
            },
        });

        if (!song) {
            res.status(404).json({ message: "Canción no encontrada" });
        }
        else {
            res.status(200).json({ message: song });
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
};

export const createSong = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = req.body;

        await prisma.song.create({ data });

        res.status(201).json({ message: "Canción creada correctamente" });
    }
    catch (error) {
        res.status(500).json({ message: error })
    }
};

export const updateSong = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const { name, artist, album, year, genre, duration, is_public } = req.body;

        const song = await prisma.song.update({
            where:
            {
                id: Number(id)
            },

            data:
            {
                name,
                artist,
                album,
                year,
                genre,
                duration,
                is_public
            }
        });

        res.status(200).json({ message: song });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const deleteSong = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const song = await prisma.song.delete({
            where:
            {
                id: Number(id)
            },
        });

        res.status(200).json({ message: "Canción eliminada" });
    }
    catch (error) {
        res.status(500).json({ message: error })
    }
};