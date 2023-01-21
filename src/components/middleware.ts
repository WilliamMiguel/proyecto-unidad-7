import type { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { RequestWithAuth } from "./type";

// Middleware general
export function validateAuthorization(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: "No autorizado" });

  if (!authorization.startsWith("Bearer "))
    return res.status(400).json({ message: "Formato de token incorrecto" });

  const token = authorization.replace("Bearer ", "");

  verify(token, String(process.env.SECRET_KEY), (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token inválido" });
    // req.body = decoded;
    next();
  });
}

// Middleware para ver canciones públicas
export const verifyToken = (
  req: RequestWithAuth,
  _res: Response,
  next: NextFunction
) => {
  const token = req?.headers["authorization"]?.split(" ")[1];
  let decodedToken;
  req.isLogged = false;

  if (!token) {
    return next();
  }

  try {
    decodedToken = verify(token, String(process.env.SECRET_KEY));
  } catch (err) {
    return next();
  }

  if (!decodedToken) {
    return next();
  }

  req.isLogged = true;
  next();
};
