import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findAll = async (_req: Request, res: Response): Promise<void> => {
    try{
        const songs = await prisma.song.findMany();

        res.status(200).json({
            ok: true,
            data: songs,
        });
    } catch (error) {
        res.status(500).json({ ok: false, message: error })
    }
};

export const createSong = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = req.body;

        await prisma.song.create({ data });

        res.status(201).json({ ok: true, message: "Canción creada correctamente" });

    } catch (error) {
        res.status(500).json({ ok: false, message: error })
    }
};