import type { Request, Response } from "express";
import { createHmac } from "node:crypto";
import { PrismaClient } from "@prisma/client";
import { sign } from "jsonwebtoken";

const prisma = new PrismaClient();

// Listar usuarios
export const findAllUsers = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await prisma.user.findMany();

    res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Filtrar usuario
export const findUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({ where: { id: Number(id) } });

    user
      ? res.status(200).json({ message: user })
      : res.status(404).json({ message: "Usuario no encontrado" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password, date_born } = req.body;

    await prisma.user.create({
      data: {
        name,
        email,
        password: createHmac("sha256", "super-secret-key")
          .update(password)
          .digest("hex"),
        date_born: new Date(date_born),
      },
    });

    res.status(201).json({ message: "Usuario creado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const { name, email, password } = req.body;

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, email, password, updated_at: new Date() },
    });

    res.status(200).json({ message: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await prisma.user.delete({ where: { id: Number(id) } });
    res.status(200).json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      const token = sign(
        { name: user?.name, id: user?.id },
        String(process.env.SECRET_KEY),
        { expiresIn: "24h" }
      );
      res.status(200).json({
        message: "Usuario logeado correctamente",
        user: user,
        token: token,
      });
    } else {
      throw Error("Email o contraseña incorrecta");
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: error });
  }
};
