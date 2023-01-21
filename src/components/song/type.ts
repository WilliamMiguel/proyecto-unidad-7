import type { Request } from "express";

export interface RequestWithAuth extends Request {
  isLogged?: boolean;
  userId?: string;
}
